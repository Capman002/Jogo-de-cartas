import { Elysia, t } from "elysia";
import { cors } from "@elysiajs/cors";
import {
  solutionCards,
  riskCards,
  type SolutionCard,
  type RiskCard,
  type IconTag,
} from "./data/cards";

// ============================================
// SISTEMA v7: TIMER TOTAL + VIDAS
// - Timer rodada acabar → perde vida
// - Carta errada → perde vida
// - Pular → perde tempo total (não vida)
// ============================================

interface ActiveRisk {
  card: RiskCard;
  instanceId: string;
  slots_preenchidos: IconTag[];
}

interface GameState {
  fase: "menu" | "resolvendo" | "vitoria" | "derrota";
  vidas: number;
  vidasMax: number;
  pontuacao: number;
  mao: SolutionCard[];
  maoMax: number;
  riscoAtual: ActiveRisk | null;
  riscosResolvidos: number;
  riscosTotal: number;
  nivel: number;
  // Timer da rodada
  tempoRodada: number;
  tempoRodadaMax: number;
  // Timer total
  tempoTotal: number;
  tempoTotalMax: number;
  // Penalidade ao pular
  penalidadePular: number;
  deck: SolutionCard[];
}

let gameState: GameState = createInitialState();

function createInitialState(): GameState {
  return {
    fase: "menu",
    vidas: 3,
    vidasMax: 3,
    pontuacao: 0,
    mao: [],
    maoMax: 7,
    riscoAtual: null,
    riscosResolvidos: 0,
    riscosTotal: 10,
    nivel: 1,
    tempoRodada: 30,
    tempoRodadaMax: 30,
    tempoTotal: 300, // 5 minutos
    tempoTotalMax: 300,
    penalidadePular: 20, // Perder 20s ao pular
    deck: [],
  };
}

function criarIdUnico(): string {
  return `${Date.now()}_${Math.floor(Math.random() * 100000)}`;
}

function criarDeck(): SolutionCard[] {
  const deck: SolutionCard[] = [];
  for (let i = 0; i < 4; i++) {
    for (const carta of solutionCards) {
      deck.push({ ...carta, id: `${carta.id}_${criarIdUnico()}` });
    }
  }
  return deck.sort(() => Math.random() - 0.5);
}

function gerarMaoInicial(): SolutionCard[] {
  const mao: SolutionCard[] = [];
  for (let i = 0; i < 5 && gameState.deck.length > 0; i++) {
    mao.push(gameState.deck.pop()!);
  }
  return mao;
}

function gerarProximoRisco(): ActiveRisk {
  let riscos = [...riskCards];
  if (gameState.nivel === 1) {
    riscos = riscos.filter((r) => r.slots_requeridos.length <= 2);
  }
  const escolhido = riscos[Math.floor(Math.random() * riscos.length)];
  return {
    card: { ...escolhido, slots_preenchidos: [] },
    instanceId: `RSK_${criarIdUnico()}`,
    slots_preenchidos: [],
  };
}

function comprarCarta(): {
  success: boolean;
  carta?: SolutionCard;
  message?: string;
} {
  if (gameState.mao.length >= gameState.maoMax) {
    return { success: false, message: "Mão cheia! Descarte primeiro." };
  }
  if (gameState.deck.length === 0) {
    gameState.deck = criarDeck();
  }
  const carta = gameState.deck.pop()!;
  gameState.mao.push(carta);
  return { success: true, carta };
}

function descartarCarta(cardId: string): { success: boolean; message: string } {
  const idx = gameState.mao.findIndex((c) => c.id === cardId);
  if (idx === -1) {
    return { success: false, message: "Carta não encontrada" };
  }
  const cartaDescartada = gameState.mao[idx];
  gameState.mao.splice(idx, 1);
  return { success: true, message: `🗑️ Descartou: ${cartaDescartada.nome}` };
}

// Perde uma vida
function perderVida(): boolean {
  gameState.vidas--;
  if (gameState.vidas <= 0) {
    gameState.vidas = 0;
    gameState.fase = "derrota";
    gameState.riscoAtual = null;
    return true; // game over
  }
  return false;
}

// APLICAR CARTA - Se errar, perde vida!
function aplicarCarta(cardId: string): {
  success: boolean;
  message: string;
  riscoResolvido: boolean;
  gameOver: boolean;
} {
  if (!gameState.riscoAtual) {
    return {
      success: false,
      message: "Nenhum risco ativo",
      riscoResolvido: false,
      gameOver: false,
    };
  }

  const idx = gameState.mao.findIndex((c) => c.id === cardId);
  if (idx === -1) {
    return {
      success: false,
      message: "Carta não encontrada",
      riscoResolvido: false,
      gameOver: false,
    };
  }

  const carta = gameState.mao[idx];
  const risco = gameState.riscoAtual;

  // NOVO: Verifica se a carta fornece algum ícone que o risco precisa
  const iconeQueResolve = carta.fornece_icones.find((icone) =>
    risco.card.slots_requeridos.some(
      (req) => req === icone && !risco.slots_preenchidos.includes(req)
    )
  );

  // CARTA ERRADA = PERDE VIDA!
  if (!iconeQueResolve) {
    gameState.mao.splice(idx, 1); // Perde a carta mesmo assim
    const gameOver = perderVida();
    return {
      success: false,
      message: gameOver
        ? "💀 Carta errada! Game Over!"
        : `❌ Carta errada! -1 vida (${gameState.vidas} restantes)`,
      riscoResolvido: false,
      gameOver,
    };
  }

  // Carta certa - preenche o primeiro slot vazio que corresponde
  risco.slots_preenchidos.push(iconeQueResolve);
  gameState.mao.splice(idx, 1);

  const done = risco.card.slots_requeridos.every((s) =>
    risco.slots_preenchidos.includes(s)
  );

  if (done) {
    gameState.tempoTotal = Math.min(
      gameState.tempoTotalMax,
      gameState.tempoTotal + 5
    );
    gameState.pontuacao += risco.card.dano_ao_trabalhador * 10;
    gameState.riscosResolvidos++;

    if (gameState.riscosResolvidos >= gameState.riscosTotal) {
      gameState.fase = "vitoria";
      gameState.riscoAtual = null;
      return {
        success: true,
        message: "🏆 VITÓRIA!",
        riscoResolvido: true,
        gameOver: false,
      };
    }

    gameState.riscoAtual = gerarProximoRisco();
    gameState.tempoRodada = gameState.tempoRodadaMax;
    return {
      success: true,
      message: "✅ Risco neutralizado! (+5s)",
      riscoResolvido: true,
      gameOver: false,
    };
  }

  const falta =
    risco.card.slots_requeridos.length - risco.slots_preenchidos.length;
  return {
    success: true,
    message: `✓ Faltam ${falta} slot(s)`,
    riscoResolvido: false,
    gameOver: false,
  };
}

// TEMPO DA RODADA ACABOU = PERDE VIDA
function tempoRodadaAcabou(): { message: string; gameOver: boolean } {
  const gameOver = perderVida();

  if (gameOver) {
    return {
      message: "💀 Tempo da rodada esgotado! Game Over!",
      gameOver: true,
    };
  }

  // Próximo risco
  gameState.riscoAtual = gerarProximoRisco();
  gameState.tempoRodada = gameState.tempoRodadaMax;

  return {
    message: `⏰ Tempo esgotado! -1 vida (${gameState.vidas} restantes)`,
    gameOver: false,
  };
}

// PULAR = Perde tempo total (NÃO vida)
function pularRisco(): {
  success: boolean;
  message: string;
  gameOver: boolean;
} {
  if (!gameState.riscoAtual) {
    return { success: false, message: "Nenhum risco", gameOver: false };
  }

  gameState.tempoTotal -= gameState.penalidadePular;

  if (gameState.tempoTotal <= 0) {
    gameState.tempoTotal = 0;
    gameState.fase = "derrota";
    gameState.riscoAtual = null;
    return {
      success: true,
      message: "⏰ Tempo total esgotado!",
      gameOver: true,
    };
  }

  gameState.riscoAtual = gerarProximoRisco();
  gameState.tempoRodada = gameState.tempoRodadaMax;

  return {
    success: true,
    message: `⏭️ Pulou! (-${gameState.penalidadePular}s)`,
    gameOver: false,
  };
}

// ============================================
// API
// ============================================

const app = new Elysia()
  .use(cors({ origin: "*" }))

  .get("/", () => ({ message: "🛡️ SST v7", version: "7.0.0" }))

  .get("/api/game/state", () => gameState)

  .post("/api/game/start", () => {
    gameState = createInitialState();
    gameState.deck = criarDeck();
    gameState.mao = gerarMaoInicial();
    gameState.riscoAtual = gerarProximoRisco();
    gameState.fase = "resolvendo";
    return { success: true, state: gameState };
  })

  .post(
    "/api/game/apply-card",
    ({ body }) => {
      const result = aplicarCarta(body.cardId);
      return { ...result, state: gameState };
    },
    { body: t.Object({ cardId: t.String() }) }
  )

  .post(
    "/api/game/discard-card",
    ({ body }) => {
      const result = descartarCarta(body.cardId);
      return { ...result, state: gameState };
    },
    { body: t.Object({ cardId: t.String() }) }
  )

  .post("/api/game/skip-risk", () => {
    const result = pularRisco();
    return { ...result, state: gameState };
  })

  .post("/api/game/draw-card", () => {
    const result = comprarCarta();
    return { ...result, state: gameState };
  })

  .post(
    "/api/game/tick",
    ({ body }) => {
      if (gameState.fase !== "resolvendo" || !gameState.riscoAtual) {
        return { updated: false, state: gameState };
      }

      // Decrementar ambos os timers
      gameState.tempoRodada -= body.deltaTime;
      gameState.tempoTotal -= body.deltaTime;

      // Timer total acabou = game over
      if (gameState.tempoTotal <= 0) {
        gameState.tempoTotal = 0;
        gameState.fase = "derrota";
        gameState.riscoAtual = null;
        return {
          updated: true,
          timedOut: true,
          message: "⏰ Tempo total esgotado!",
          gameOver: true,
          state: gameState,
        };
      }

      // Timer da rodada acabou = perde vida!
      if (gameState.tempoRodada <= 0) {
        const result = tempoRodadaAcabou();
        return { updated: true, timedOut: true, ...result, state: gameState };
      }

      return { updated: true, state: gameState };
    },
    { body: t.Object({ deltaTime: t.Number() }) }
  )

  .listen(3001);

console.log(`
🛡️ SST v7.0 - Timer Total + Vidas
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❤️ 3 vidas
⏰ Tempo rodada acabar = -1 vida
❌ Carta errada = -1 vida
⏭️ Pular = -20s (não perde vida)
✅ Resolver = +5s bônus
🚀 http://localhost:${app.server?.port}
`);
