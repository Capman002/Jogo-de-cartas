import type { CardData } from "../gameTypes";

export const PLAYER_DECK: CardData[] = [
  {
    id: "01",
    name: "Capacete com Jugular",
    type: "unit",
    cost: 1,
    image: "/cartas/Capacete_com_Jugular.avif",
    stats: { attack: 1, health: 3, max_health: 3 },
    tags: ["epi", "physical"],
    mechanics: ["taunt"],
  },
  {
    id: "02",
    name: "Botina Biqueira Aço",
    type: "unit",
    cost: 2,
    image: "/cartas/Botina_Biqueira_Aço.avif",
    stats: { attack: 2, health: 4, max_health: 4 },
    tags: ["epi", "physical", "chemical"],
    mechanics: ["taunt"],
  },
  {
    id: "05",
    name: "Luva Nitrílica",
    type: "unit",
    cost: 2,
    image: "/cartas/Luva_Nitrílica.avif",
    stats: { attack: 1, health: 4, max_health: 4 },
    tags: ["epi", "chemical"],
  },
  {
    id: "16",
    name: "DDS Diário",
    type: "spell",
    cost: 1,
    image: "/cartas/DDS_Diário.avif",
    tags: ["action"],
    description: "Draw 1 card.",
  },
  {
    id: "08",
    name: "Óculos Ampla Visão",
    type: "unit",
    cost: 1,
    image: "/cartas/Óculos_Ampla_Visão.avif",
    stats: { attack: 1, health: 2, max_health: 2 },
    tags: ["epi", "chemical"],
  },
  // Duplicates for deck size
  {
    id: "01_2",
    name: "Capacete com Jugular",
    type: "unit",
    cost: 1,
    image: "/cartas/Capacete_com_Jugular.avif",
    stats: { attack: 1, health: 3, max_health: 3 },
    tags: ["epi", "physical"],
    mechanics: ["taunt"],
  },
];

export const BOT_DECK: CardData[] = [
  {
    id: "101",
    name: "Martelo Solto",
    type: "unit",
    cost: 1,
    image: "/cartas/Martelo_Solto.avif",
    stats: { attack: 2, health: 1, max_health: 1 },
    tags: ["risk", "physical"],
  },
  {
    id: "102",
    name: "Ruído de Impacto",
    type: "unit",
    cost: 2,
    image: "/cartas/Ruído_de_Impacto.avif",
    stats: { attack: 3, health: 2, max_health: 2 },
    tags: ["risk", "physical"],
  },
  {
    id: "103",
    name: "Piso Molhado",
    type: "unit",
    cost: 2,
    image: "/cartas/Piso_Molhado.avif",
    stats: { attack: 1, health: 3, max_health: 3 },
    tags: ["risk", "chemical"],
  },
  {
    id: "104",
    name: "Fio Desencapado",
    type: "unit",
    cost: 3,
    image: "/cartas/Fio_Desencapado.avif",
    stats: { attack: 4, health: 2, max_health: 2 },
    tags: ["risk", "electrical"],
  },
];

export const ALL_CARDS: CardData[] = [
  ...PLAYER_DECK.filter((c) => !c.id.includes("_")), // Filter out duplicates like 01_2
  ...BOT_DECK,
];
