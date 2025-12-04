export type CardType = "unit" | "spell" | "action";

export interface CardStats {
  attack: number;
  health: number;
  max_health: number;
}

export interface CardData {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  image: string;
  stats?: CardStats;
  tags: string[];
  description?: string;
  mechanics?: string[];
}

export interface PlayerState {
  id: 1 | 2;
  health: number;
  maxHealth: number;
  energy: number;
  maxEnergy: number;
  hand: CardData[];
  field: CardData[];
  deck: CardData[];
  graveyard: CardData[];
}
