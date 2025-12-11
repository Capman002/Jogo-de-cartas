import { Elysia, t } from "elysia";
import {
  getGameState,
  resetGameState,
  spawnRandomRisk,
  applySolutionToRisk,
  installEPC,
  drawCard,
  setGameState,
} from "../data/gameState";

export const gameRoutes = new Elysia({ prefix: "/api/game" })
  // Obter estado atual do jogo
  .get("/state", () => {
    return getGameState();
  })

  // Iniciar novo jogo
  .post("/start", () => {
    const state = resetGameState();
    state.isRunning = true;
    setGameState(state);
    return { success: true, state };
  })

  // Pausar/Despausar
  .post("/pause", () => {
    const state = getGameState();
    state.isPaused = !state.isPaused;
    setGameState(state);
    return { success: true, isPaused: state.isPaused };
  })

  // Spawnar um novo risco (chamado pelo game loop do frontend)
  .post("/spawn-risk", () => {
    const risk = spawnRandomRisk();
    if (risk) {
      return { success: true, risk };
    }
    return { success: false, message: "Falha ao spawnar risco" };
  })

  // Jogar uma carta de solução em um risco
  .post(
    "/play-card",
    ({ body }) => {
      const { cardId, riskId } = body;
      return applySolutionToRisk(cardId, riskId);
    },
    {
      body: t.Object({
        cardId: t.String(),
        riskId: t.String(),
      }),
    }
  )

  // Instalar EPC em uma lane
  .post(
    "/install-epc",
    ({ body }) => {
      const { cardId, lane } = body;
      return installEPC(cardId, lane);
    },
    {
      body: t.Object({
        cardId: t.String(),
        lane: t.Number(),
      }),
    }
  )

  // Comprar carta do deck
  .post("/draw-card", () => {
    return drawCard();
  })

  // Atualizar posição dos riscos (game tick)
  .post(
    "/tick",
    ({ body }) => {
      const { deltaTime } = body;
      const state = getGameState();

      if (!state.isRunning || state.isPaused || state.gameOver) {
        return { updated: false };
      }

      // Mover riscos para baixo
      for (const risk of state.riscosAtivos) {
        risk.positionY += risk.velocidade_descida * deltaTime * 10;

        // Verificar se EPC instalado pode resolver slot automaticamente
        const epcNaLane = state.epcsInstalados.filter(
          (e) => e.lane === risk.lane
        );
        for (const epc of epcNaLane) {
          // EPC aplica automaticamente quando risco passa pela zona de instalação (30-60%)
          if (risk.positionY >= 30 && risk.positionY <= 60) {
            const slotIndex = risk.slots_requeridos.findIndex(
              (slot) =>
                slot === epc.card.fornece_icone &&
                !risk.slots_preenchidos.includes(slot)
            );
            if (slotIndex !== -1) {
              risk.slots_preenchidos.push(epc.card.fornece_icone);
            }
          }
        }

        // Verificar se risco chegou na base (Game Over condition)
        if (risk.positionY >= 100) {
          // Risco não neutralizado causa dano
          const slotsRestantes = risk.slots_requeridos.filter(
            (s) => !risk.slots_preenchidos.includes(s)
          );

          if (slotsRestantes.length > 0) {
            state.integridade -= risk.dano_ao_trabalhador;

            if (state.integridade <= 0) {
              state.gameOver = true;
              state.integridade = 0;
            }
          } else {
            // Risco foi neutralizado no último momento
            state.riscosNeutralizados++;
            state.pontuacao += risk.dano_ao_trabalhador * 10;
          }

          // Remover risco da lista
          state.riscosAtivos = state.riscosAtivos.filter(
            (r) => r.instanceId !== risk.instanceId
          );
        }
      }

      // Regenerar energia gradualmente
      if (state.energia < state.energiaMax) {
        state.energia = Math.min(
          state.energiaMax,
          state.energia + deltaTime * 0.5
        );
      }

      // Atualizar tempo
      state.tempoRestante -= deltaTime;
      if (state.tempoRestante <= 0 && !state.gameOver) {
        state.victory = state.integridade > 50;
        state.isRunning = false;
      }

      setGameState(state);
      return { updated: true, state };
    },
    {
      body: t.Object({
        deltaTime: t.Number(),
      }),
    }
  );
