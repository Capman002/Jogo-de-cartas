import type { SolutionCard } from "../../types/game";
import { ICON_EMOJI, CATEGORY_COLORS } from "../../types/game";
import "./SolutionCard.css";

interface SolutionCardProps {
  card: SolutionCard;
  isSelected: boolean;
  canPlay: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}

export function SolutionCardComponent({
  card,
  isSelected,
  canPlay,
  onClick,
  style,
}: SolutionCardProps) {
  const { nome, tipo, fornece_icones, descricao, custo_energia } = card;
  const categoryColor = CATEGORY_COLORS[tipo];

  return (
    <div
      className={`solution-card ${isSelected ? "selected" : ""} ${
        !canPlay ? "disabled" : ""
      } type-${tipo.toLowerCase()}`}
      style={
        {
          "--category-color": categoryColor,
          ...style,
        } as React.CSSProperties
      }
      onClick={canPlay ? onClick : undefined}
    >
      {/* Borda brilhante */}
      <div className="card-glow" style={{ background: categoryColor }} />

      {/* Header */}
      <div className="card-header">
        <span className="card-type" style={{ background: categoryColor }}>
          {tipo}
        </span>
        <span className="card-cost">
          <span>⚡</span>
          {custo_energia}
        </span>
      </div>

      {/* Ícone principal (múltiplos ícones se for combo) */}
      <div className="card-icon-area">
        <span className="card-main-icon">
          {fornece_icones.map((icone) => ICON_EMOJI[icone]).join(" ")}
        </span>
      </div>

      {/* Nome */}
      <h3 className="card-name">{nome}</h3>

      {/* Descrição */}
      <p className="card-description">{descricao}</p>

      {/* Indicador de seleção */}
      {isSelected && (
        <div className="card-selected-indicator">
          <span>✓</span>
        </div>
      )}

      {/* Overlay de desabilitado */}
      {!canPlay && (
        <div className="card-disabled-overlay">
          <span>⚡ Energia Insuficiente</span>
        </div>
      )}
    </div>
  );
}
