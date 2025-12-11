import type { InstalledEPC } from "../../types/game";
import { ICON_EMOJI } from "../../types/game";
import "./EPCSlot.css";

interface EPCSlotProps {
  epc: InstalledEPC;
}

export function EPCSlot({ epc }: EPCSlotProps) {
  const { card } = epc;

  return (
    <div className="epc-slot" title={`${card.nome} - ${card.descricao}`}>
      <span className="epc-icon">
        {card.fornece_icones.map((icone) => ICON_EMOJI[icone]).join(" ")}
      </span>
      <span className="epc-name">{card.nome}</span>
      <div className="epc-active-indicator">
        <span>⚡</span>
      </div>
    </div>
  );
}
