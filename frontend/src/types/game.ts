// ==============================
// SISTEMA v2 - 3 PILARES
// ==============================
// 🔨 Físico, 🧪 Químico, 🧠 Mental

export type IconTag =
  | "FISICO" // 🔨 Impactos, quedas, cortes, queimaduras, eletricidade
  | "QUIMICO" // 🧪 Gases, vapores, névoas, poeiras, corrosivos
  | "MENTAL"; // 🧠 Erro humano, fadiga, stress, desconhecimento

export type CardCategory = "EPI" | "ADM" | "EPC";
export type RiskSeverity = "Baixa" | "Media" | "Alta" | "Critica";

export interface SolutionCard {
  id: string;
  nome: string;
  tipo: CardCategory;
  fornece_icones: IconTag[]; // MUDANÇA: Agora array para suportar combos
  descricao: string;
  custo_energia: number;
  cor: string;
}

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

export interface ActiveRisk {
  card: RiskCard;
  instanceId: string;
  slots_preenchidos: IconTag[];
}

export interface GameState {
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
  penalidadePular: number;
  deck: SolutionCard[];
}

// Ícones visuais (3 pilares)
export const ICON_EMOJI: Record<IconTag, string> = {
  FISICO: "🔨",
  QUIMICO: "🧪",
  MENTAL: "🧠",
};

export const ICON_LABELS: Record<IconTag, string> = {
  FISICO: "Físico",
  QUIMICO: "Químico",
  MENTAL: "Mental",
};

export const CATEGORY_COLORS: Record<CardCategory, string> = {
  EPI: "#3b82f6",
  ADM: "#eab308",
  EPC: "#a855f7",
};

export const SEVERITY_COLORS: Record<RiskSeverity, string> = {
  Baixa: "#22c55e",
  Media: "#eab308",
  Alta: "#f97316",
  Critica: "#ef4444",
};
