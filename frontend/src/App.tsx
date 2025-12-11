import { useState, useEffect, useCallback, useRef } from "react";
import type { GameState, SolutionCard } from "./types/game";
import {
  ICON_EMOJI,
  ICON_LABELS,
  CATEGORY_COLORS,
  SEVERITY_COLORS,
} from "./types/game";
import * as api from "./api/gameApi";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [discardMode, setDiscardMode] = useState(false);
  const lastTickRef = useRef<number>(Date.now());
  const gameStateRef = useRef<GameState | null>(null);
  const isTickingRef = useRef<boolean>(false);

  // Manter ref sincronizada com o estado
  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    api
      .getGameState()
      .then(setGameState)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const timerLoop = useCallback(async () => {
    // Evitar chamadas simultâneas
    if (isTickingRef.current) return;

    const currentState = gameStateRef.current;
    if (!currentState || currentState.fase !== "resolvendo") return;

    isTickingRef.current = true;

    try {
      const now = Date.now();
      const deltaTime = (now - lastTickRef.current) / 1000;
      lastTickRef.current = now;

      const result = await api.gameTick(deltaTime);
      if (result.state) setGameState(result.state);
      if (result.timedOut && result.message) {
        showMessage(result.message, "error");
      }
    } finally {
      isTickingRef.current = false;
    }
  }, []); // Sem dependências - usa refs

  useEffect(() => {
    if (gameState?.fase === "resolvendo") {
      lastTickRef.current = Date.now(); // Reset ao iniciar
      const interval = setInterval(timerLoop, 500); // 500ms ao invés de 100ms
      return () => clearInterval(interval);
    }
  }, [gameState?.fase, timerLoop]);

  const showMessage = (
    text: string,
    type: "success" | "error" | "info" = "info"
  ) => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 2500);
  };

  const handleStart = async () => {
    const result = await api.startGame();
    if (result.success) {
      setGameState(result.state);
      lastTickRef.current = Date.now();
      setDiscardMode(false);
    }
  };

  const handleCardClick = async (card: SolutionCard) => {
    if (discardMode) {
      const result = await api.discardCard(card.id);
      showMessage(result.message, result.success ? "info" : "error");
      setGameState(result.state);
      setDiscardMode(false);
    } else {
      const result = await api.applyCard(card.id);
      showMessage(result.message, result.success ? "success" : "error");
      setGameState(result.state);
    }
  };

  const handleSkip = async () => {
    const result = await api.skipRisk();
    showMessage(result.message, "error");
    setGameState(result.state);
  };

  const handleDraw = async () => {
    const result = await api.drawCard();
    if (result.success) {
      showMessage(`📥 Comprou: ${result.carta?.nome}`, "success");
    } else {
      showMessage(result.message || "Erro", "error");
    }
    setGameState(result.state);
  };

  const toggleDiscardMode = () => {
    setDiscardMode(!discardMode);
    if (!discardMode) {
      showMessage("🗑️ Clique na carta para descartar", "info");
    }
  };

  // Formatar tempo (segundos -> mm:ss)
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (isLoading) {
    return (
      <div className="screen-center">
        <div className="loader"></div>
      </div>
    );
  }

  // MENU
  if (!gameState || gameState.fase === "menu") {
    return (
      <div className="screen-center menu-screen">
        <div className="menu-box">
          <div className="menu-logo">
            <span className="menu-icon">🛡️</span>
            <h1>SST</h1>
            <span className="menu-subtitle">Protocolo de Segurança</span>
          </div>
          <div className="menu-rules">
            <h3>🎮 Como Jogar</h3>
            <ul>
              <li>
                🎯 Preencha os <b>slots</b> do risco
              </li>
              <li>
                📥 <b>Compre cartas</b> do deck
              </li>
              <li>
                🗑️ <b>Descarte</b> para abrir espaço
              </li>
              <li>
                ⏱️ Gerencie seu <b>tempo total</b>!
              </li>
            </ul>
            <div className="menu-tip">
              <strong>💡 Dica:</strong> Pular custa tempo, resolver ganha bônus!
            </div>
          </div>
          <button className="btn-primary btn-large" onClick={handleStart}>
            ▶️ JOGAR
          </button>
        </div>
      </div>
    );
  }

  // VITÓRIA
  if (gameState.fase === "vitoria") {
    return (
      <div className="screen-center end-screen victory">
        <div className="end-box">
          <span className="end-icon">🏆</span>
          <h1>PARABÉNS!</h1>
          <p>Todos os riscos neutralizados!</p>
          <div className="end-stats">
            <div>
              <b>{gameState.pontuacao}</b>
              <span>pontos</span>
            </div>
            <div>
              <b>{formatTime(gameState.tempoTotal)}</b>
              <span>tempo restante</span>
            </div>
          </div>
          <button className="btn-primary" onClick={handleStart}>
            🔄 Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  // DERROTA
  if (gameState.fase === "derrota") {
    return (
      <div className="screen-center end-screen defeat">
        <div className="end-box">
          <span className="end-icon">⏰</span>
          <h1>TEMPO ESGOTADO</h1>
          <p>O tempo total acabou!</p>
          <div className="end-stats">
            <div>
              <b>{gameState.pontuacao}</b>
              <span>pontos</span>
            </div>
            <div>
              <b>
                {gameState.riscosResolvidos}/{gameState.riscosTotal}
              </b>
              <span>riscos</span>
            </div>
          </div>
          <button className="btn-primary" onClick={handleStart}>
            🔄 Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // GAMEPLAY
  const risco = gameState.riscoAtual;
  const rodadaPercent =
    (gameState.tempoRodada / gameState.tempoRodadaMax) * 100;
  const totalPercent = (gameState.tempoTotal / gameState.tempoTotalMax) * 100;
  const rodadaColor =
    rodadaPercent > 50 ? "#22c55e" : rodadaPercent > 25 ? "#eab308" : "#ef4444";
  const totalColor =
    totalPercent > 50 ? "#3b82f6" : totalPercent > 25 ? "#eab308" : "#ef4444";
  const maoCheia = gameState.mao.length >= gameState.maoMax;

  return (
    <div className="game-container">
      {/* HEADER */}
      <header className="game-header">
        {/* Timer Total */}
        <div className="header-total-timer">
          <span className="timer-icon">⏱️</span>
          <span className="timer-value" style={{ color: totalColor }}>
            {formatTime(gameState.tempoTotal)}
          </span>
          <div className="timer-bar-mini">
            <div
              className="timer-bar-fill-mini"
              style={{ width: `${totalPercent}%`, background: totalColor }}
            />
          </div>
        </div>

        {/* Vidas */}
        <div className="header-lives">
          {Array.from({ length: gameState.vidasMax }).map((_, i) => (
            <span
              key={i}
              className={i < gameState.vidas ? "heart full" : "heart empty"}
            >
              ❤️
            </span>
          ))}
        </div>

        {/* Progresso */}
        <div className="header-progress">
          <span>
            Risco {gameState.riscosResolvidos + 1}/{gameState.riscosTotal}
          </span>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${
                  (gameState.riscosResolvidos / gameState.riscosTotal) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Pontuação */}
        <div className="header-score">
          <span className="score-value">{gameState.pontuacao}</span>
          <span className="score-label">pts</span>
        </div>
      </header>

      {/* MENSAGEM */}
      {message && (
        <div className={`toast toast-${message.type}`}>{message.text}</div>
      )}

      {/* ÁREA PRINCIPAL */}
      <main className="game-main">
        {risco && (
          <div className="risk-panel">
            {/* Timer da Rodada */}
            <div className="round-timer">
              <span className="round-timer-label">Tempo desta rodada</span>
              <div className="timer-bar">
                <div
                  className="timer-fill"
                  style={{
                    width: `${rodadaPercent}%`,
                    background: rodadaColor,
                  }}
                />
                <span className="timer-text">
                  {Math.ceil(gameState.tempoRodada)}s
                </span>
              </div>
            </div>

            {/* Card do Risco */}
            <div
              className="risk-card"
              style={{ borderColor: SEVERITY_COLORS[risco.card.gravidade] }}
            >
              <span
                className="risk-badge"
                style={{ background: SEVERITY_COLORS[risco.card.gravidade] }}
              >
                {risco.card.gravidade}
              </span>
              <h2>{risco.card.nome}</h2>
              <p className="risk-desc">{risco.card.descricao}</p>

              <div className="slots-area">
                <span className="slots-title">Slots Necessários:</span>
                <div className="slots-list">
                  {risco.card.slots_requeridos.map((slot, idx) => {
                    const preenchido = risco.slots_preenchidos.includes(slot);
                    return (
                      <div
                        key={idx}
                        className={`slot ${preenchido ? "slot-done" : ""}`}
                      >
                        <span className="slot-emoji">{ICON_EMOJI[slot]}</span>
                        <span className="slot-name">{ICON_LABELS[slot]}</span>
                        {preenchido && <span className="slot-check">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Botão Pular */}
            <button className="btn-skip" onClick={handleSkip}>
              ⏭️ Pular (-{gameState.penalidadePular}s do tempo total)
            </button>
          </div>
        )}
      </main>

      {/* MÃO */}
      <footer className="game-footer">
        <div className="hand-header">
          <span>
            🃏 Mão ({gameState.mao.length}/{gameState.maoMax})
          </span>
          <div className="hand-actions">
            <button
              className={`btn-discard ${discardMode ? "active" : ""}`}
              onClick={toggleDiscardMode}
            >
              🗑️ {discardMode ? "Cancelar" : "Descartar"}
            </button>
            <button
              className="btn-draw"
              onClick={handleDraw}
              disabled={maoCheia}
            >
              📥 Comprar
            </button>
          </div>
        </div>

        {discardMode && (
          <div className="discard-notice">
            ⚠️ Clique em uma carta para descartá-la
          </div>
        )}

        <div className="hand-grid">
          {gameState.mao.map((card) => (
            <div
              key={card.id}
              className={`hand-card ${discardMode ? "discard-target" : ""}`}
              onClick={() => handleCardClick(card)}
            >
              <div
                className="card-badge"
                style={{ background: CATEGORY_COLORS[card.tipo] }}
              >
                {card.tipo}
              </div>
              <span className="card-emoji">
                {card.fornece_icones
                  .map((icone) => ICON_EMOJI[icone])
                  .join(" ")}
              </span>
              <span className="card-name">{card.nome}</span>
              {discardMode && <div className="card-discard-tag">🗑️</div>}
            </div>
          ))}
          {gameState.mao.length === 0 && (
            <div className="hand-empty">Mão vazia! Compre cartas.</div>
          )}
        </div>

        {maoCheia && (
          <div className="hand-full-notice">
            ⚠️ Mão cheia! Descarte para comprar.
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
