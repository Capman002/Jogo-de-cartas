import {
  RiskCard,
  SolutionCard,
  drawRandomSolutions,
  createRiskInstance,
  riskCards,
} from "./cards";

export interface ActiveRisk extends RiskCard {
  instanceId: string;
  lane: number; // 0, 1 ou 2
  positionY: number; // 0 = topo, 100 = base (zona do trabalhador)
}

export interface InstalledEPC {
  card: SolutionCard;
  lane: number;
  instanceId: string;
}

export interface GameState {
  // Status do jogo
  isRunning: boolean;
  isPaused: boolean;
  gameOver: boolean;
  victory: boolean;

  // Recursos do jogador
  integridade: number; // "Vida" do trabalhador (100 = saudável)
  energia: number; // Recurso para jogar cartas
  energiaMax: number;

  // Cartas
  mao: SolutionCard[]; // Cartas na mão do jogador
  maoMax: number;
  deck: SolutionCard[]; // Cartas restantes no deck

  // Campo de jogo
  riscosAtivos: ActiveRisk[]; // Riscos descendo nas lanes
  epcsInstalados: InstalledEPC[]; // EPCs fixos na zona de instalação

  // Progresso
  nivel: number;
  riscosNeutralizados: number;
  pontuacao: number;

  // Tempo
  tempoRestante: number; // Segundos restantes do nível

  // Lanes (3 trilhas)
  lanes: number; // Sempre 3
}

// Estado inicial do jogo
export function createInitialGameState(): GameState {
  return {
    isRunning: false,
    isPaused: false,
    gameOver: false,
    victory: false,

    integridade: 100,
    energia: 5,
    energiaMax: 10,

    mao: drawRandomSolutions(5),
    maoMax: 7,
    deck: [], // Será populado ao iniciar nível

    riscosAtivos: [],
    epcsInstalados: [],

    nivel: 1,
    riscosNeutralizados: 0,
    pontuacao: 0,

    tempoRestante: 120, // 2 minutos por nível

    lanes: 3,
  };
}

// Variável global para armazenar o estado (em produção usaria banco de dados)
let currentGameState: GameState = createInitialGameState();

export function getGameState(): GameState {
  return currentGameState;
}

export function setGameState(state: GameState): void {
  currentGameState = state;
}

export function resetGameState(): GameState {
  currentGameState = createInitialGameState();
  return currentGameState;
}

// Spawnar um risco aleatório em uma lane
export function spawnRandomRisk(): ActiveRisk | null {
  const randomRisk = riskCards[Math.floor(Math.random() * riskCards.length)];
  const instance = createRiskInstance(randomRisk.id);

  if (!instance) return null;

  const activeRisk: ActiveRisk = {
    ...instance,
    instanceId: `${instance.id}_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`,
    lane: Math.floor(Math.random() * 3),
    positionY: 0,
  };

  currentGameState.riscosAtivos.push(activeRisk);
  return activeRisk;
}

// Aplicar uma carta de solução a um risco
export function applySolutionToRisk(
  solutionCardId: string,
  riskInstanceId: string
): { success: boolean; message: string; riskNeutralized: boolean } {
  const solution = currentGameState.mao.find((c) => c.id === solutionCardId);
  const risk = currentGameState.riscosAtivos.find(
    (r) => r.instanceId === riskInstanceId
  );

  if (!solution) {
    return {
      success: false,
      message: "Carta não encontrada na mão",
      riskNeutralized: false,
    };
  }

  if (!risk) {
    return {
      success: false,
      message: "Risco não encontrado",
      riskNeutralized: false,
    };
  }

  // Verificar se temos energia suficiente
  if (currentGameState.energia < solution.custo_energia) {
    return {
      success: false,
      message: "Energia insuficiente",
      riskNeutralized: false,
    };
  }

  // Verificar se o risco precisa desse ícone
  const slotIndex = risk.slots_requeridos.findIndex(
    (slot) =>
      slot === solution.fornece_icone && !risk.slots_preenchidos.includes(slot)
  );

  if (slotIndex === -1) {
    return {
      success: false,
      message: "Este risco não precisa desse tipo de proteção",
      riskNeutralized: false,
    };
  }

  // Aplicar a solução
  risk.slots_preenchidos.push(solution.fornece_icone);

  // Remover carta da mão e gastar energia
  currentGameState.mao = currentGameState.mao.filter(
    (c) => c.id !== solutionCardId
  );
  currentGameState.energia -= solution.custo_energia;

  // Verificar se o risco foi completamente neutralizado
  const isNeutralized = risk.slots_requeridos.every((req) =>
    risk.slots_preenchidos.includes(req)
  );

  if (isNeutralized) {
    // Remover risco e dar pontos
    currentGameState.riscosAtivos = currentGameState.riscosAtivos.filter(
      (r) => r.instanceId !== riskInstanceId
    );
    currentGameState.riscosNeutralizados++;
    currentGameState.pontuacao += risk.dano_ao_trabalhador * 10; // Pontos baseados no perigo evitado

    return {
      success: true,
      message: "Risco neutralizado!",
      riskNeutralized: true,
    };
  }

  return { success: true, message: "Slot preenchido", riskNeutralized: false };
}

// Instalar EPC na zona de instalação
export function installEPC(
  cardId: string,
  lane: number
): { success: boolean; message: string } {
  const card = currentGameState.mao.find((c) => c.id === cardId);

  if (!card) {
    return { success: false, message: "Carta não encontrada" };
  }

  if (card.tipo !== "EPC") {
    return { success: false, message: "Apenas EPCs podem ser instalados" };
  }

  if (currentGameState.energia < card.custo_energia) {
    return { success: false, message: "Energia insuficiente" };
  }

  // Verificar se já tem um EPC do mesmo tipo na lane
  const existingEPC = currentGameState.epcsInstalados.find(
    (e) => e.lane === lane && e.card.fornece_icone === card.fornece_icone
  );

  if (existingEPC) {
    return {
      success: false,
      message: "Já existe um EPC desse tipo nesta lane",
    };
  }

  // Instalar
  currentGameState.epcsInstalados.push({
    card,
    lane,
    instanceId: `EPC_${Date.now()}`,
  });

  currentGameState.mao = currentGameState.mao.filter((c) => c.id !== cardId);
  currentGameState.energia -= card.custo_energia;

  return {
    success: true,
    message: `${card.nome} instalado na lane ${lane + 1}`,
  };
}

// Comprar uma carta do deck
export function drawCard(): { success: boolean; card?: SolutionCard } {
  if (currentGameState.mao.length >= currentGameState.maoMax) {
    return { success: false };
  }

  if (currentGameState.deck.length === 0) {
    // Reembaralhar cartas usadas ou gerar novas
    currentGameState.deck = drawRandomSolutions(10);
  }

  const card = currentGameState.deck.pop();
  if (card) {
    currentGameState.mao.push(card);
    return { success: true, card };
  }

  return { success: false };
}
