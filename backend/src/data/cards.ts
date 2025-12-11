// ==============================
// SISTEMA DE CARTAS v2 - 3 PILARES
// ==============================
// 🔨 Físico, 🧪 Químico, 🧠 Mental

// Tipos de ícones baseados nos 3 pilares
export type IconTag =
  | "FISICO" // 🔨 Impactos, quedas, cortes, queimaduras, eletricidade
  | "QUIMICO" // 🧪 Gases, vapores, névoas, poeiras, corrosivos
  | "MENTAL"; // 🧠 Erro humano, fadiga, stress, desconhecimento

export type CardCategory = "EPI" | "ADM" | "EPC";
export type RiskSeverity = "Baixa" | "Media" | "Alta" | "Critica";

// Carta de Solução (que o jogador usa)
export interface SolutionCard {
  id: string;
  nome: string;
  tipo: CardCategory;
  fornece_icones: IconTag[]; // MUDANÇA: Agora array (cartas podem resolver múltiplos tipos)
  descricao: string;
  custo_energia: number;
  cor: string;
}

// Carta de Risco (inimigo que desce)
export interface RiskCard {
  id: string;
  nome: string;
  gravidade: RiskSeverity;
  slots_requeridos: IconTag[];
  slots_preenchidos: IconTag[];
  velocidade_descida: number;
  descricao: string;
  dano_ao_trabalhador: number;
}

// ==============================
// BANCO DE DADOS: 35 CARTAS DE SOLUÇÃO
// ==============================
export const solutionCards: SolutionCard[] = [
  // ============ EPI (12 cartas) ============
  {
    id: "EPI_001",
    nome: "Capacete com Jugular",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Contra impactos e quedas",
    custo_energia: 1,
    cor: "#3B82F6",
  },
  {
    id: "EPI_002",
    nome: "Óculos Ampla Visão",
    tipo: "EPI",
    fornece_icones: ["FISICO", "QUIMICO"], // Combo!
    descricao: "Contra partículas volantes e respingos",
    custo_energia: 2,
    cor: "#3B82F6",
  },
  {
    id: "EPI_003",
    nome: "Protetor Auricular Plug",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Redução leve de ruído (conforto)",
    custo_energia: 1,
    cor: "#3B82F6",
  },
  {
    id: "EPI_004",
    nome: "Abafador de Ruído (Concha)",
    tipo: "EPI",
    fornece_icones: ["FISICO", "MENTAL"], // Combo!
    descricao: "Redução drástica de ruído (foco)",
    custo_energia: 2,
    cor: "#3B82F6",
  },
  {
    id: "EPI_005",
    nome: "Luva de Vaqueta",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Trabalho pesado, abrasão",
    custo_energia: 1,
    cor: "#3B82F6",
  },
  {
    id: "EPI_006",
    nome: "Luva Nitrílica",
    tipo: "EPI",
    fornece_icones: ["QUIMICO"],
    descricao: "Manuseio de óleos e solventes",
    custo_energia: 1,
    cor: "#3B82F6",
  },
  {
    id: "EPI_007",
    nome: "Luva Isolante",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Alta tensão elétrica",
    custo_energia: 2,
    cor: "#3B82F6",
  },
  {
    id: "EPI_008",
    nome: "Luva de Malha de Aço",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Corte por lâminas",
    custo_energia: 1,
    cor: "#3B82F6",
  },
  {
    id: "EPI_009",
    nome: "Respirador PFF2 (N95)",
    tipo: "EPI",
    fornece_icones: ["QUIMICO"],
    descricao: "Poeiras e névoas",
    custo_energia: 1,
    cor: "#3B82F6",
  },
  {
    id: "EPI_010",
    nome: "Máscara Facial Total (Full Face)",
    tipo: "EPI",
    fornece_icones: ["QUIMICO", "FISICO"], // Combo!
    descricao: "Gases tóxicos e proteção ocular",
    custo_energia: 3,
    cor: "#3B82F6",
  },
  {
    id: "EPI_011",
    nome: "Cinto Paraquedista",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Trabalho em altura",
    custo_energia: 2,
    cor: "#3B82F6",
  },
  {
    id: "EPI_012",
    nome: "Roupa de Aproximação",
    tipo: "EPI",
    fornece_icones: ["FISICO"],
    descricao: "Calor radiante extremo",
    custo_energia: 2,
    cor: "#3B82F6",
  },

  // ============ ADM (11 cartas) ============
  {
    id: "ADM_001",
    nome: "Permissão de Trabalho (PT)",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Burocracia que obriga a checagem",
    custo_energia: 1,
    cor: "#EAB308",
  },
  {
    id: "ADM_002",
    nome: "Análise de Risco (APR)",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Identificação prévia de perigos",
    custo_energia: 2,
    cor: "#EAB308",
  },
  {
    id: "ADM_003",
    nome: "Treinamento Técnico",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Aumenta a perícia, reduz erro",
    custo_energia: 2,
    cor: "#EAB308",
  },
  {
    id: "ADM_004",
    nome: "Pausa Programada",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Reseta a barra de fadiga",
    custo_energia: 1,
    cor: "#EAB308",
  },
  {
    id: "ADM_005",
    nome: "Rodízio de Função",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Quebra a monotonia/hipnose",
    custo_energia: 1,
    cor: "#EAB308",
  },
  {
    id: "ADM_006",
    nome: "Sinalização/Placas",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Alerta visual passivo",
    custo_energia: 1,
    cor: "#EAB308",
  },
  {
    id: "ADM_007",
    nome: "Diálogo Diário (DDS)",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Reforço de memória de curto prazo",
    custo_energia: 1,
    cor: "#EAB308",
  },
  {
    id: "ADM_008",
    nome: "Procedimento de Emergência",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Evita pânico em crises",
    custo_energia: 2,
    cor: "#EAB308",
  },
  {
    id: "ADM_009",
    nome: "Checklist de Pré-uso",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Garante que a máquina não falhe",
    custo_energia: 1,
    cor: "#EAB308",
  },
  {
    id: "ADM_010",
    nome: "Vigia de Espaço Confinado",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Monitoramento externo humano",
    custo_energia: 2,
    cor: "#EAB308",
  },
  {
    id: "ADM_011",
    nome: "Isolamento de Área (Fita)",
    tipo: "ADM",
    fornece_icones: ["MENTAL"],
    descricao: "Barreira psicológica visual",
    custo_energia: 1,
    cor: "#EAB308",
  },

  // ============ EPC (12 cartas) ============
  {
    id: "EPC_001",
    nome: "Guarda-Corpo Rígido",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Elimina risco de queda",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_002",
    nome: "Sensor de Presença",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Para máquina se alguém entrar",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_003",
    nome: "Botão de Emergência",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Parada imediata manual",
    custo_energia: 2,
    cor: "#A855F7",
  },
  {
    id: "EPC_004",
    nome: "Exaustor Localizado",
    tipo: "EPC",
    fornece_icones: ["QUIMICO"],
    descricao: "Suga o veneno na fonte",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_005",
    nome: "Cabine Acústica",
    tipo: "EPC",
    fornece_icones: ["FISICO", "MENTAL"], // Combo!
    descricao: "Isola a fonte de ruído",
    custo_energia: 4,
    cor: "#A855F7",
  },
  {
    id: "EPC_006",
    nome: "Lava-Olhos de Emergência",
    tipo: "EPC",
    fornece_icones: ["QUIMICO"],
    descricao: "Mitigação pós-acidente",
    custo_energia: 2,
    cor: "#A855F7",
  },
  {
    id: "EPC_007",
    nome: "Kit de Bloqueio (LOTO)",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Cadeado físico em disjuntores",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_008",
    nome: "Tapete Antifadiga",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Ergonomia física para trabalho em pé",
    custo_energia: 2,
    cor: "#A855F7",
  },
  {
    id: "EPC_009",
    nome: "Iluminação LED Correta",
    tipo: "EPC",
    fornece_icones: ["MENTAL", "FISICO"], // Combo!
    descricao: "Melhora visibilidade e atenção",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_010",
    nome: "Ventilação Geral Diluidora",
    tipo: "EPC",
    fornece_icones: ["QUIMICO"],
    descricao: "Renovação de ar do galpão",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_011",
    nome: "Aterramento Elétrico",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Desvia fuga de corrente",
    custo_energia: 3,
    cor: "#A855F7",
  },
  {
    id: "EPC_012",
    nome: "Biombo de Solda",
    tipo: "EPC",
    fornece_icones: ["FISICO"],
    descricao: "Barreira contra UV e fagulhas",
    custo_energia: 2,
    cor: "#A855F7",
  },
];

// ==============================
// BANCO DE DADOS: RISCOS (3 NÍVEIS)
// ==============================
export const riskCards: RiskCard[] = [
  // ============ NÍVEL 1: Riscos Simples (1-2 slots) ============
  {
    id: "RSK_001",
    nome: "Vazamento de Óleo no Chão",
    gravidade: "Baixa",
    slots_requeridos: ["MENTAL"], // Sinalização ou limpeza
    slots_preenchidos: [],
    velocidade_descida: 0.9,
    descricao: "Risco de escorregamento e queda",
    dano_ao_trabalhador: 10,
  },
  {
    id: "RSK_002",
    nome: "Ruído de Lixadeira",
    gravidade: "Media",
    slots_requeridos: ["FISICO"], // Protetor auricular
    slots_preenchidos: [],
    velocidade_descida: 1.0,
    descricao: "Barulho irritante causa distração",
    dano_ao_trabalhador: 12,
  },
  {
    id: "RSK_003",
    nome: "Poeira de Varrição",
    gravidade: "Baixa",
    slots_requeridos: ["QUIMICO"], // Respirador PFF2
    slots_preenchidos: [],
    velocidade_descida: 0.8,
    descricao: "Nuvem de partículas finas no ar",
    dano_ao_trabalhador: 8,
  },
  {
    id: "RSK_004",
    nome: "Tédio Operacional",
    gravidade: "Media",
    slots_requeridos: ["MENTAL"], // Rodízio ou pausa
    slots_preenchidos: [],
    velocidade_descida: 1.0,
    descricao: "Monotonia leva ao erro",
    dano_ao_trabalhador: 15,
  },

  // ============ NÍVEL 2: Riscos Intermediários (Combos) ============
  {
    id: "RSK_005",
    nome: "Pintura em Spray (Galpão Fechado)",
    gravidade: "Alta",
    slots_requeridos: ["QUIMICO", "MENTAL"], // Máscara + APR ou Exaustor
    slots_preenchidos: [],
    velocidade_descida: 1.1,
    descricao: "Névoa tóxica + Ambiente saturado",
    dano_ao_trabalhador: 25,
  },
  {
    id: "RSK_006",
    nome: "Manutenção em Quadro Elétrico Vivo",
    gravidade: "Alta",
    slots_requeridos: ["FISICO", "MENTAL"], // Luva Isolante + PT
    slots_preenchidos: [],
    velocidade_descida: 1.0,
    descricao: "Risco de morte + Alta tensão cognitiva",
    dano_ao_trabalhador: 30,
  },
  {
    id: "RSK_007",
    nome: "Operação de Prensa Hidráulica",
    gravidade: "Alta",
    slots_requeridos: ["FISICO", "MENTAL"], // Sensor + Treinamento
    slots_preenchidos: [],
    velocidade_descida: 1.2,
    descricao: "Esmagamento + Repetição mecânica",
    dano_ao_trabalhador: 28,
  },
  {
    id: "RSK_008",
    nome: "Transporte de Carga Suspensa",
    gravidade: "Media",
    slots_requeridos: ["FISICO", "MENTAL"], // Capacete + Sinalização
    slots_preenchidos: [],
    velocidade_descida: 0.9,
    descricao: "Risco de queda de materiais",
    dano_ao_trabalhador: 20,
  },

  // ============ NÍVEL 3: Riscos Críticos (3 slots) ============
  {
    id: "RSK_009",
    nome: "Entrada em Tanque Subterrâneo",
    gravidade: "Critica",
    slots_requeridos: ["QUIMICO", "MENTAL", "MENTAL"], // Full Face + Vigia + PT
    slots_preenchidos: [],
    velocidade_descida: 0.7,
    descricao: "Espaço confinado: IPVS + Claustrofobia + Acesso difícil",
    dano_ao_trabalhador: 50,
  },
  {
    id: "RSK_010",
    nome: "Soldagem em Altura",
    gravidade: "Critica",
    slots_requeridos: ["QUIMICO", "FISICO", "FISICO"], // Respirador + Cinto + Biombo
    slots_preenchidos: [],
    velocidade_descida: 0.8,
    descricao: "Fumos metálicos + Queda + Queimadura",
    dano_ao_trabalhador: 45,
  },
  {
    id: "RSK_011",
    nome: "Surto Psicótico / Burnout Coletivo",
    gravidade: "Critica",
    slots_requeridos: ["MENTAL", "MENTAL", "MENTAL"], // Pausa + DDS + Rodízio
    slots_preenchidos: [],
    velocidade_descida: 0.9,
    descricao: "Equipe sobrecarregada ignorando regras",
    dano_ao_trabalhador: 40,
  },
  {
    id: "RSK_012",
    nome: "Vazamento de Gás em Caldeira",
    gravidade: "Critica",
    slots_requeridos: ["QUIMICO", "FISICO", "MENTAL"], // Full Face + Botão Emergência + Proc. Emergência
    slots_preenchidos: [],
    velocidade_descida: 1.0,
    descricao: "Gás explosivo + Calor + Pânico em potencial",
    dano_ao_trabalhador: 48,
  },
];

// Função para criar uma cópia de risco (para spawnar no jogo)
export function createRiskInstance(riskId: string): RiskCard | null {
  const template = riskCards.find((r) => r.id === riskId);
  if (!template) return null;

  return {
    ...template,
    slots_preenchidos: [], // Reset dos slots
  };
}

// Função para obter cartas de solução aleatórias (para a mão do jogador)
export function drawRandomSolutions(count: number): SolutionCard[] {
  const shuffled = [...solutionCards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
