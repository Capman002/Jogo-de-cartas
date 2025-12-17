import { motion } from "framer-motion";
import { SolutionCard as SolutionCardType, ICON_EMOJI } from "../../types/game";
import { cn } from "../../lib/utils";

interface SolutionCardProps {
  card: SolutionCardType;
  onClick: () => void;
  isDiscardMode?: boolean;
}

export function SolutionCard({
  card,
  onClick,
  isDiscardMode,
}: SolutionCardProps) {
  return (
    <motion.div
      layout
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative w-40 h-60 rounded-xl cursor-pointer perspective-1000 transition-all duration-300 isolate group",
        isDiscardMode ? "ring-2 ring-destructive animate-pulse grayscale" : ""
      )}
    >
      {/* Background with color based on type/category */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-gray-800 to-black border border-white/20 shadow-2xl overflow-hidden">
        {/* Art placeholder - Generated image logic removed for now, using color branding */}
        <div
          className="h-32 w-full bg-cover bg-center relative mask-linear-fade"
          style={{ backgroundColor: card.cor || "#333" }}
        >
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="p-3">
          <h4 className="text-white font-bold text-sm leading-tight mb-1 truncate">
            {card.nome}
          </h4>
          <div className="flex gap-1 mb-2">
            {card.fornece_icones.map((icon, i) => (
              <span
                key={i}
                className="text-xs bg-white/10 px-1 rounded"
                title={icon}
              >
                {ICON_EMOJI[icon]}
              </span>
            ))}
          </div>
          <p className="text-[10px] text-gray-400 leading-snug line-clamp-3">
            {card.descricao}
          </p>
        </div>

        {/* Type Badge at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-1 bg-white/5 text-center border-t border-white/10">
          <span className="text-[9px] uppercase tracking-widest text-white/50">
            {card.tipo}
          </span>
        </div>
      </div>

      {/* Discard Overlay */}
      {isDiscardMode && (
        <div className="absolute inset-0 rounded-xl bg-destructive/40 flex items-center justify-center backdrop-blur-sm z-20">
          <span className="text-white font-bold text-xl drop-shadow-md">
            DESCARTAR
          </span>
        </div>
      )}
    </motion.div>
  );
}
