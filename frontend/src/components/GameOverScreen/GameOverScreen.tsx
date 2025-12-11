import "./GameOverScreen.css";

interface GameOverScreenProps {
  victory: boolean;
  score: number;
  risksNeutralized: number;
  onRestart: () => void;
}

export function GameOverScreen({
  victory,
  score,
  risksNeutralized,
  onRestart,
}: GameOverScreenProps) {
  return (
    <div className={`gameover-screen ${victory ? "victory" : "defeat"}`}>
      <div className="gameover-bg"></div>

      <div className="gameover-content">
        {/* Ícone */}
        <div className="gameover-icon">{victory ? "🏆" : "⚠️"}</div>

        {/* Título */}
        <h1 className="gameover-title">
          {victory ? "PROTOCOLO CONCLUÍDO" : "ACIDENTE DE TRABALHO"}
        </h1>

        {/* Subtítulo */}
        <p className="gameover-subtitle">
          {victory
            ? "A segurança do trabalhador foi garantida!"
            : "A integridade do trabalhador foi comprometida."}
        </p>

        {/* Estatísticas */}
        <div className="gameover-stats">
          <div className="stat-card">
            <span className="stat-value">{score}</span>
            <span className="stat-label">Pontuação</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{risksNeutralized}</span>
            <span className="stat-label">Riscos Neutralizados</span>
          </div>
        </div>

        {/* Mensagem educativa */}
        <div className="gameover-lesson">
          {victory ? (
            <p>
              <strong>Lição:</strong> A combinação de EPIs, procedimentos
              administrativos e proteções coletivas é essencial para um ambiente
              de trabalho seguro.
            </p>
          ) : (
            <p>
              <strong>Lição:</strong> Nunca negligencie a segurança. EPIs
              sozinhos não bastam - é preciso treinamento e procedimentos
              adequados.
            </p>
          )}
        </div>

        {/* Botão de reinício */}
        <button className="restart-button" onClick={onRestart}>
          <span>🔄</span>
          TENTAR NOVAMENTE
        </button>
      </div>
    </div>
  );
}
