import type { ActiveRisk } from "../../types/game";
import { ICON_EMOJI, SEVERITY_COLORS } from "../../types/game";
import "./RiskCard.css";

interface RiskCardProps {
  risk: ActiveRisk;
  isTargetable: boolean;
  onClick: () => void;
}

export function RiskCard({ risk, isTargetable, onClick }: RiskCardProps) {
  const { nome, gravidade, slots_requeridos, slots_preenchidos, positionY } =
    risk;

  const severityColor = SEVERITY_COLORS[gravidade];
  const slotsRestantes = slots_requeridos.filter(
    (s) => !slots_preenchidos.includes(s)
  );
  const progresso =
    ((slots_requeridos.length - slotsRestantes.length) /
      slots_requeridos.length) *
    100;

  return (
    <div
      className={`risk-card ${
        isTargetable ? "targetable" : ""
      } severity-${gravidade.toLowerCase()}`}
      style={{
        top: `${positionY}%`,
        borderColor: severityColor,
      }}
      onClick={isTargetable ? onClick : undefined}
    >
      {/* Barra de progresso de neutralização */}
      <div
        className="risk-progress"
        style={{
          width: `${progresso}%`,
          background: `linear-gradient(90deg, ${severityColor}44, ${severityColor})`,
        }}
      />

      {/* Conteúdo */}
      <div className="risk-content">
        {/* Header */}
        <div className="risk-header">
          <span className="risk-severity" style={{ background: severityColor }}>
            {gravidade}
          </span>
        </div>

        {/* Nome */}
        <h3 className="risk-name">{nome}</h3>

        {/* Slots */}
        <div className="risk-slots">
          {slots_requeridos.map((slot, index) => {
            const isFilled = slots_preenchidos.includes(slot);
            return (
              <div
                key={index}
                className={`slot ${isFilled ? "filled" : "empty"}`}
                title={slot}
              >
                <span className="slot-icon">{ICON_EMOJI[slot]}</span>
                {isFilled && <span className="slot-check">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicador de targetable */}
      {isTargetable && (
        <div className="risk-target-indicator">
          <span>🎯</span>
        </div>
      )}
    </div>
  );
}
