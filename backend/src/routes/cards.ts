import { Elysia } from "elysia";
import { solutionCards, riskCards, drawRandomSolutions } from "../data/cards";

export const cardsRoutes = new Elysia({ prefix: "/api/cards" })
  // Listar todas as cartas de solução
  .get("/solutions", () => {
    return {
      total: solutionCards.length,
      cards: solutionCards,
    };
  })

  // Listar todas as cartas de risco
  .get("/risks", () => {
    return {
      total: riskCards.length,
      cards: riskCards,
    };
  })

  // Obter carta de solução por ID
  .get("/solutions/:id", ({ params }) => {
    const card = solutionCards.find((c) => c.id === params.id);
    if (!card) {
      return { error: "Carta não encontrada" };
    }
    return card;
  })

  // Obter carta de risco por ID
  .get("/risks/:id", ({ params }) => {
    const card = riskCards.find((c) => c.id === params.id);
    if (!card) {
      return { error: "Carta não encontrada" };
    }
    return card;
  })

  // Obter cartas agrupadas por categoria
  .get("/by-category", () => {
    return {
      EPI: solutionCards.filter((c) => c.tipo === "EPI"),
      ADM: solutionCards.filter((c) => c.tipo === "ADM"),
      EPC: solutionCards.filter((c) => c.tipo === "EPC"),
    };
  })

  // Comprar mão aleatória (para testes)
  .get("/random/:count", ({ params }) => {
    const count = parseInt(params.count) || 5;
    return drawRandomSolutions(Math.min(count, 10));
  });
