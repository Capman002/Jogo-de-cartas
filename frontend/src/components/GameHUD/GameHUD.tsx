import type { GameState } from "../../types/game";
import "./GameHUD.css";

interface GameHUDProps {
  gameState: GameState;
  onPause: () => void;
  onDrawCard: () => void;
}

export function GameHUD({ gameState, onPause, onDrawCard }: GameHUDProps) {
  const {
    integridade,
    energia,
    energiaMax,
    nivel,
    pontuacao,
    tempoRestante,
    isPaused,
    mao,
    maoMax,
  } = gameState;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <header className="game-hud">
      {/* Seção Esquerda - Saúde e Energia */}
      <div className="hud-section hud-left">
        {/* Integridade do Trabalhador */}
        <div className="hud-stat">
          <span className="stat-icon">❤️</span>
          <div className="stat-bar-container">
            <div
              className={`stat-bar health-bar ${
                integridade <= 30 ? "critical" : ""
              }`}
              style={{ width: `${integridade}%` }}
            />
          </div>
          <span className="stat-text">{integridade}%</span>
        </div>

        {/* Energia */}
        <div className="hud-stat">
          <span className="stat-icon">⚡</span>
          <div className="stat-bar-container">
            <div
              className="stat-bar energy-bar"
              style={{ width: `${(energia / energiaMax) * 100}%` }}
            />
          </div>
          <span className="stat-text">
            {Math.floor(energia)}/{energiaMax}
          </span>
        </div>
      </div>

      {/* Seção Central - Tempo e Nível */}
      <div className="hud-section hud-center">
        <div className="hud-level">
          <span className="level-label">NÍVEL</span>
          <span className="level-value">{nivel}</span>
        </div>
        <div className="hud-timer">
          <span className="timer-icon">⏱️</span>
          <span
            className={`timer-value ${tempoRestante <= 30 ? "warning" : ""}`}
          >
            {formatTime(tempoRestante)}
          </span>
        </div>
        <div className="hud-score">
          <span className="score-label">PONTOS</span>
          <span className="score-value">{pontuacao}</span>
        </div>
      </div>

      {/* Seção Direita - Controles */}
      <div className="hud-section hud-right">
        {/* Contador de cartas */}
        <div className="hud-cards-count">
          <span>🃏</span>
          <span>
            {mao.length}/{maoMax}
          </span>
        </div>

        {/* Botão Comprar Carta */}
        <button
          className="hud-button draw-button"
          onClick={onDrawCard}
          disabled={mao.length >= maoMax}
        >
          <span>📥</span>
          Comprar
        </button>

        {/* Botão Pausar */}
        <button className="hud-button pause-button" onClick={onPause}>
          <span>{isPaused ? "▶️" : "⏸️"}</span>
          {isPaused ? "Continuar" : "Pausar"}
        </button>
      </div>
    </header>
  );
}
