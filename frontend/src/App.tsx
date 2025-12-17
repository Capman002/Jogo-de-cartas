import { useState, useEffect } from "react";
import { GameState, SolutionCard as SolutionCardType } from "./types/game";
import * as gameApi from "./api/gameApi";
import { MainMenu } from "./components/screens/MainMenu";
import { GameOverScreen } from "./components/screens/GameOverScreen";
import { VictoryScreen } from "./components/screens/VictoryScreen";
import { RiskManagement } from "./components/game/RiskManagement";
import { PlayerHand } from "./components/game/PlayerHand";
import { GameHeader } from "./components/game/GameHeader";
import { Toaster, toast } from "sonner";

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState(false);
  const [discardMode, setDiscardMode] = useState(false);

  // Game Loop & Polling
  useEffect(() => {
    let lastTime = Date.now();

    const loop = async () => {
      if (!gameState) {
        // Initial fetch
        try {
          const state = await gameApi.getGameState();
          setGameState(state);
        } catch (e) {
          console.error(e);
        }
        return;
      }

      if (gameState.fase === "resolvendo") {
        // Game Running: Tick
        const now = Date.now();
        const delta = (now - lastTime) / 1000;
        lastTime = now;

        try {
          // Envia o delta real (ou max 1.0s para evitar saltos gigantes se a aba ficar inativa)
          const safeDelta = Math.min(delta, 1.0);
          const result = await gameApi.gameTick(safeDelta);
          if (result.updated) {
            setGameState(result.state);
            if (result.gameOver) {
              toast.error(result.message || "Game Over!");
            } else if (result.timedOut) {
              toast.warning(result.message || "Tempo esgotado!", {
                duration: 3000,
              });
            }
          }
        } catch (e) {
          console.error("Tick error:", e);
        }
      } else {
        // Menu/Victory/Defeat: Just poll occasionally
        try {
          const state = await gameApi.getGameState();
          setGameState(state);
        } catch (e) {
          console.error(e);
        }
        lastTime = Date.now(); // Reset time for next game start
      }
    };

    // Run loop every 1s (matching the logic granularity)
    // Se quiser mais suave no UI, poderia ser menor, mas o backend parece granular em segundos (1s, 5s, etc)
    const intervalId = setInterval(loop, 1000);

    return () => clearInterval(intervalId);
  }, [gameState?.fase]); // Depende da fase para resetar timers se mudar? Não necessariamente, mas ajuda a garantir consistência.

  const handleStartGame = async () => {
    setLoading(true);
    try {
      await gameApi.startGame();
      const state = await gameApi.getGameState();
      setGameState(state);
    } catch (error) {
      toast.error("Erro ao iniciar jogo");
    } finally {
      setLoading(false);
    }
  };

  const handleDraw = async () => {
    if (!gameState) return;
    try {
      const result = await gameApi.drawCard();
      if (result.success) {
        toast.success("Carta comprada!");
        const newState = await gameApi.getGameState();
        setGameState(newState);
      } else {
        toast.error(result.message || "Mão cheia!");
      }
    } catch (error) {
      toast.error("Erro ao comprar carta");
    }
  };

  const handleSkip = async () => {
    try {
      const result = await gameApi.skipRisk();
      if (result.success) {
        toast.info("Risco ignorado (penalidade aplicada)");
        const newState = await gameApi.getGameState();
        setGameState(newState);
      }
    } catch (error) {
      toast.error("Erro ao pular risco");
    }
  };

  const handleCardClick = async (card: SolutionCardType) => {
    if (!gameState) return;

    if (discardMode) {
      try {
        const result = await gameApi.discardCard(card.id);
        if (result.success) {
          toast.success("Carta descartada");
          setDiscardMode(false);
          const newState = await gameApi.getGameState();
          setGameState(newState);
        }
      } catch (error) {
        toast.error("Erro ao descartar");
      }
      return;
    }

    // Play card logic
    try {
      const result = await gameApi.applyCard(card.id);
      if (result.success) {
        toast.success("Carta aplicada!", {
          description: result.riscoResolvido
            ? "Risco NEUTRALIZADO!"
            : "Requisito preenchido",
        });
        const newState = await gameApi.getGameState();
        setGameState(newState);
      } else {
        toast.error(result.message || "Carta inválida para este risco");
      }
    } catch (error) {
      toast.error("Erro ao jogar carta");
    }
  };

  if (!gameState)
    return (
      <div className="h-screen w-full flex items-center justify-center text-neon-blue">
        Carregando sistema...
      </div>
    );

  return (
    <div className="min-h-screen w-full text-foreground font-sans selection:bg-neon-blue selection:text-black overflow-hidden relative">
      <Toaster theme="dark" position="top-center" richColors />
      {gameState.fase === "menu" && (
        <MainMenu onStart={handleStartGame} isLoading={loading} />
      )}
      {gameState.fase === "vitoria" && (
        <VictoryScreen state={gameState} onRestart={handleStartGame} />
      )}
      {gameState.fase === "derrota" && (
        <GameOverScreen state={gameState} onRetry={handleStartGame} />
      )}
      {gameState.fase === "resolvendo" && (
        <div className="flex flex-col h-screen overflow-hidden relative">
          <GameHeader state={gameState} />

          <main className="flex-1 flex flex-col items-center justify-center p-4 pt-28 relative z-10 w-full max-w-7xl mx-auto pointer-events-none md:pointer-events-auto min-h-0">
            <RiskManagement state={gameState} onSkip={handleSkip} />
          </main>

          <PlayerHand
            state={gameState}
            onCardClick={handleCardClick}
            onDraw={handleDraw}
            discardMode={discardMode}
            setDiscardMode={setDiscardMode}
          />
        </div>
      )}
    </div>
  );
}

export default App;
