import { motion, AnimatePresence } from "framer-motion";
import {
  GameState,
  ICON_EMOJI,
  ICON_LABELS,
  RiskSeverity,
} from "../../types/game";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import { AlertTriangle, FastForward, Skull } from "lucide-react";
import { cn } from "../../lib/utils";

interface RiskManagementProps {
  state: GameState;
  onSkip: () => void;
}

const SEVERITY_COLORS_NEON: Record<RiskSeverity, string> = {
  Baixa: "shadow-[0_0_30px_rgba(34,197,94,0.3)] border-green-500/40",
  Media: "shadow-[0_0_40px_rgba(234,179,8,0.3)] border-yellow-500/40",
  Alta: "shadow-[0_0_50px_rgba(249,115,22,0.4)] border-orange-500/50",
  Critica: "shadow-[0_0_60px_rgba(239,68,68,0.5)] border-red-600/60",
};

export function RiskManagement({ state, onSkip }: RiskManagementProps) {
  const risk = state.riscoAtual;
  if (!risk) return null;

  const roundTimeConfig = {
    percent: (state.tempoRodada / state.tempoRodadaMax) * 100,
    color: state.tempoRodada > 5 ? "bg-neon-green" : "bg-destructive",
  };

  return (
    <div className="flex flex-col items-center justify-center w-full relative z-0 flex-1 pointer-events-auto overflow-visible pb-24 md:pb-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={risk.instanceId}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          transition={{ type: "spring", bounce: 0.3 }}
          className="relative w-full max-w-4xl px-2 md:px-4"
        >
          <Card
            glass
            className={cn(
              "relative overflow-hidden backdrop-blur-2xl bg-black/80 transition-all duration-500 border",
              SEVERITY_COLORS_NEON[risk.card.gravidade]
            )}
          >
            {/* HEADER REMOVED - Using GameHeader component instead */}

            {/* MAIN CONTENT AREA - COMPACT MODE */}
            <div className="p-3 md:p-6 relative flex flex-col items-center text-center">
              {/* Background Ambient Glow */}
              <div
                className={cn(
                  "absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-b from-transparent to-black",
                  risk.card.gravidade === "Critica"
                    ? "bg-red-500"
                    : risk.card.gravidade === "Alta"
                    ? "bg-orange-500"
                    : "bg-blue-500"
                )}
              />

              {/* Badges Row */}
              <div className="flex items-center gap-2 mb-2 relative z-10">
                <Badge
                  variant="outline"
                  className="border-white/10 bg-white/5 backdrop-blur-md px-2 py-0.5 text-[9px] md:text-[10px]"
                >
                  <AlertTriangle size={10} className="mr-1 md:w-3 md:h-3" />
                  <span className="uppercase tracking-widest font-bold">
                    {risk.card.gravidade}
                  </span>
                </Badge>
              </div>

              {/* Title - Compact */}
              <h2 className="text-xl md:text-4xl font-black text-white tracking-tighter leading-tight drop-shadow-xl z-10 max-w-2xl mx-auto">
                {risk.card.nome}
              </h2>

              {/* Description - Truncated */}
              <p className="text-xs md:text-sm text-gray-400 mt-1 mb-4 font-light leading-snug max-w-xl mx-auto line-clamp-2 z-10">
                {risk.card.descricao}
              </p>

              {/* Slots Area - Compact Horizontal */}
              <div className="bg-black/40 rounded-xl p-3 md:p-4 border border-white/5 relative z-10 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-2 px-2">
                  <h4 className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-bold">
                    Protocolo Requerido
                  </h4>
                  <div className="text-destructive font-bold text-xs flex items-center gap-1">
                    <Skull size={12} /> -{risk.card.dano_ao_trabalhador} se
                    falhar
                  </div>
                </div>

                <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
                  {risk.card.slots_requeridos.map((slot, idx) => {
                    const isFilled = risk.slots_preenchidos.includes(slot);
                    return (
                      <motion.div
                        key={idx}
                        layout
                        className={cn(
                          "h-12 w-10 md:h-16 md:w-14 rounded-md border flex flex-col items-center justify-center gap-0.5 transition-all relative overflow-hidden group",
                          isFilled
                            ? "bg-neon-green/20 border-neon-green text-neon-green shadow-[0_0_15px_rgba(10,255,96,0.2)]"
                            : "bg-white/5 border-white/10 text-gray-500 border-dashed hover:border-white/30"
                        )}
                      >
                        <span className="text-lg md:text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform">
                          {ICON_EMOJI[slot]}
                        </span>
                        <span className="text-[6px] md:text-[7px] font-bold uppercase tracking-wider opacity-70">
                          {ICON_LABELS[slot]}
                        </span>

                        {isFilled && (
                          <motion.div
                            layoutId={`check-${risk.instanceId}-${idx}`}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-neon-green/10 backdrop-blur-[1px]"
                          >
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-neon-green flex items-center justify-center text-black font-bold shadow-[0_0_10px_#0aff60] text-[10px] md:text-xs">
                              ✓
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ROUND TIMER - Bottom Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/50">
              <motion.div
                className={cn(
                  "h-full shadow-[0_0_15px_currentColor]",
                  roundTimeConfig.color
                )}
                style={{
                  backgroundColor:
                    roundTimeConfig.color === "bg-neon-green"
                      ? "#0aff60"
                      : "#ff003c",
                }}
                animate={{ width: `${roundTimeConfig.percent}%` }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </div>
          </Card>

          {/* Skip Button - Adjusted position */}
          <div className="mt-6 flex justify-center relative z-20">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-white hover:bg-white/5 gap-2 text-xs opacity-60 hover:opacity-100 transition-opacity"
              onClick={onSkip}
            >
              <FastForward size={14} />
              <span className="tracking-wider">
                IGNORAR (-{state.penalidadePular}s)
              </span>
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
