import type { GameState, SolutionCard } from "../types/game";

const API_BASE = "/api";

export async function getGameState(): Promise<GameState> {
  const res = await fetch(`${API_BASE}/game/state`);
  return res.json();
}

export async function startGame(): Promise<{
  success: boolean;
  state: GameState;
}> {
  const res = await fetch(`${API_BASE}/game/start`, { method: "POST" });
  return res.json();
}

export async function applyCard(cardId: string): Promise<{
  success: boolean;
  message: string;
  riscoResolvido: boolean;
  gameOver: boolean;
  state: GameState;
}> {
  const res = await fetch(`${API_BASE}/game/apply-card`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId }),
  });
  return res.json();
}

// NOVA: Descartar carta
export async function discardCard(cardId: string): Promise<{
  success: boolean;
  message: string;
  state: GameState;
}> {
  const res = await fetch(`${API_BASE}/game/discard-card`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cardId }),
  });
  return res.json();
}

export async function skipRisk(): Promise<{
  success: boolean;
  message: string;
  gameOver: boolean;
  state: GameState;
}> {
  const res = await fetch(`${API_BASE}/game/skip-risk`, { method: "POST" });
  return res.json();
}

export async function drawCard(): Promise<{
  success: boolean;
  carta?: SolutionCard;
  message?: string;
  state: GameState;
}> {
  const res = await fetch(`${API_BASE}/game/draw-card`, { method: "POST" });
  return res.json();
}

export async function gameTick(deltaTime: number): Promise<{
  updated: boolean;
  timedOut?: boolean;
  message?: string;
  gameOver?: boolean;
  state: GameState;
}> {
  const res = await fetch(`${API_BASE}/game/tick`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deltaTime }),
  });
  return res.json();
}
