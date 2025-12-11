import "./StartScreen.css";

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="start-screen">
      {/* Background animado */}
      <div className="start-bg-pattern"></div>

      {/* Conteúdo */}
      <div className="start-content">
        {/* Logo */}
        <div className="start-logo">
          <span className="logo-icon">🛡️</span>
          <h1 className="logo-title">
            <span className="text-gradient">SST</span>
          </h1>
          <p className="logo-subtitle">Protocolo de Segurança</p>
        </div>

        {/* Descrição */}
        <p className="start-description">
          Assuma o papel de um Gestor de Segurança e neutralize os{" "}
          <strong>Riscos</strong> antes que atinjam o trabalhador. Use{" "}
          <span className="tag-epi">EPIs</span>,{" "}
          <span className="tag-adm">Procedimentos</span> e{" "}
          <span className="tag-epc">Engenharia</span> para proteger sua equipe.
        </p>

        {/* Cards de instrução */}
        <div className="start-instructions">
          <div className="instruction-card">
            <span className="instruction-icon">🔵</span>
            <h3>EPI</h3>
            <p>Proteção individual consumível</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">🟡</span>
            <h3>ADM</h3>
            <p>Conhecimento e autorizações</p>
          </div>
          <div className="instruction-card">
            <span className="instruction-icon">🟣</span>
            <h3>EPC</h3>
            <p>Proteção coletiva permanente</p>
          </div>
        </div>

        {/* Botão de início */}
        <button className="start-button" onClick={onStart}>
          <span className="button-glow"></span>
          <span className="button-text">INICIAR PROTOCOLO</span>
        </button>

        {/* Footer */}
        <p className="start-footer">
          Baseado na Hierarquia de Controle de Riscos • NR-01
        </p>
      </div>
    </div>
  );
}
