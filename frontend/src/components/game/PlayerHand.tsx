import { AnimatePresence, motion } from "framer-motion";
import { GameState, SolutionCard as SolutionCardType } from "../../types/game";
import { SolutionCard } from "./SolutionCard";
import { Button } from "../ui/Button";
import { Trash2, PlusCircle, Layers } from "lucide-react";

interface PlayerHandProps {
  state: GameState;
  onCardClick: (card: SolutionCardType) => void;
  onDraw: () => void;
  discardMode: boolean;
  setDiscardMode: (mode: boolean) => void;
}

export function PlayerHand({
  state,
  onCardClick,
  onDraw,
  discardMode,
  setDiscardMode,
}: PlayerHandProps) {
  const isHandFull = state.mao.length >= state.maoMax;

  return (
    <div className="w-full relative z-50 pointer-events-none flex flex-col justify-end mt-auto shrink-0">
      {/* Helper Gradient for smooth transition */}
      <div className="h-40 w-full bg-gradient-to-t from-black via-black/90 to-transparent absolute bottom-0 left-0 z-0 pointer-events-none" />

      {/* Main Dock Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pb-4 md:pb-6 flex items-end justify-center gap-4 md:gap-8 pointer-events-auto">
        {/* Left Controls: Deck/Draw */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <Button
            variant={isHandFull ? "ghost" : "primary"}
            size="icon"
            disabled={isHandFull}
            onClick={onDraw}
            className="w-16 h-16 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.15)] relative group transition-all hover:scale-105 active:scale-95 border border-white/10 bg-black/40 backdrop-blur-md"
            title="Comprar Carta"
          >
            <PlusCircle
              size={32}
              className="text-neon-blue group-hover:rotate-90 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="absolute -top-8 text-[10px] bg-black/80 text-neon-blue px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              COMPRAR
            </span>
          </Button>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-black/60 rounded-full px-3 py-1 border border-white/5 backdrop-blur-sm">
            <Layers size={12} />
            <span className="font-mono font-bold text-white">
              {state.mao.length}/{state.maoMax}
            </span>
          </div>
        </div>

        {/* Hand Cards Area */}
        <div className="flex-1 overflow-x-auto overflow-y-visible py-4 flex items-end justify-center gap-3 no-scrollbar h-[260px] md:h-[300px] perspective-1000">
          <AnimatePresence mode="popLayout">
            {state.mao.length > 0 ? (
              state.mao.map((card) => (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ y: 200, opacity: 0, rotate: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                  }}
                  exit={{
                    y: 200,
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  className="relative flex-shrink-0 cursor-pointer w-32 md:w-40"
                  style={{ transformOrigin: "bottom center" }}
                >
                  <SolutionCard
                    card={card}
                    onClick={() => onCardClick(card)}
                    isDiscardMode={discardMode}
                  />
                </motion.div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full w-full text-muted-foreground opacity-50 animate-pulse">
                <span className="text-sm uppercase tracking-widest font-bold border-b border-white/10 pb-1">
                  Mão Vazia
                </span>
                <span className="text-[10px] mt-1">
                  Compre cartas à esquerda
                </span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Controls: Discard */}
        <div className="flex flex-col items-center gap-2 mb-2">
          <Button
            variant={discardMode ? "destructive" : "secondary"}
            size="icon"
            onClick={() => setDiscardMode(!discardMode)}
            className={`w-14 h-14 rounded-2xl transition-all hover:scale-105 active:scale-95 border border-white/10 ${
              discardMode
                ? "shadow-[0_0_30px_rgba(239,68,68,0.4)] bg-destructive text-white ring-2 ring-destructive ring-offset-2 ring-offset-black"
                : "bg-black/40 backdrop-blur-md text-muted-foreground hover:text-white"
            }`}
            title="Modo Descarte"
          >
            <Trash2 size={24} className={discardMode ? "animate-bounce" : ""} />
            <span className="absolute -top-8 text-[10px] bg-black/80 text-red-500 px-2 py-1 rounded border border-white/10 opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
              {discardMode ? "CANCELAR" : "DESCARTAR"}
            </span>
          </Button>
          <div className="h-6" />{" "}
          {/* Spacer to align with stacked left controls */}
        </div>
      </div>
    </div>
  );
}
