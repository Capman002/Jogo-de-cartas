import type { SolutionCard } from "../../types/game";
import { SolutionCardComponent } from "../SolutionCard/SolutionCard";
import "./PlayerHand.css";

interface PlayerHandProps {
  cards: SolutionCard[];
  selectedCard: SolutionCard | null;
  energia: number;
  onSelectCard: (card: SolutionCard) => void;
}

export function PlayerHand({
  cards,
  selectedCard,
  energia,
  onSelectCard,
}: PlayerHandProps) {
  return (
    <div className="player-hand">
      <div className="hand-label">
        <span>🃏</span>
        <span>SUA MÃO</span>
      </div>

      <div className="hand-cards">
        {cards.length === 0 ? (
          <p className="hand-empty">
            Nenhuma carta na mão. Clique em "Comprar" para obter cartas.
          </p>
        ) : (
          cards.map((card, index) => (
            <SolutionCardComponent
              key={card.id}
              card={card}
              isSelected={selectedCard?.id === card.id}
              canPlay={energia >= card.custo_energia}
              onClick={() => onSelectCard(card)}
              style={
                {
                  "--card-index": index,
                  "--total-cards": cards.length,
                } as React.CSSProperties
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
