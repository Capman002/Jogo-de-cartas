import { motion } from "framer-motion";
import { GameState } from "../../types/game";
import { Card } from "../ui/Card";
import { Heart, Trophy, Timer, Crosshair } from "lucide-react";

interface GameHeaderProps {
  state: GameState;
}

export function GameHeader({ state }: GameHeaderProps) {
  const progressPercent = (state.riscosResolvidos / state.riscosTotal) * 100;

  // Color calculation for timer
  const totalPercent = (state.tempoTotal / state.tempoTotalMax) * 100;
  const timerColor =
    totalPercent > 50
      ? "text-neon-blue"
      : totalPercent > 20
      ? "text-yellow-500"
      : "text-destructive";

  return (
    <Card
      className="fixed top-4 left-4 right-4 h-20 flex items-center justify-between px-6 z-40 bg-black/60 border-white/10"
      glass
    >
      {/* Esquerda: Timer Total */}
      <div className="flex items-center gap-4 min-w-[200px]">
        <div className={`p-2 rounded-full bg-white/5 ${timerColor}`}>
          <Timer className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className={`text-2xl font-mono font-bold ${timerColor}`}>
            {Math.floor(state.tempoTotal / 60)}:
            {Math.floor(state.tempoTotal % 60)
              .toString()
              .padStart(2, "0")}
          </span>
          <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
            <motion.div
              className="h-full bg-current"
              style={{ backgroundColor: "currentColor", color: "inherit" }}
              animate={{ width: `${totalPercent}%` }}
              transition={{ duration: 1, ease: "linear" }}
            />
          </div>
        </div>
      </div>

      {/* Centro: Progresso da Missão */}
      <div className="flex flex-col items-center flex-1 max-w-md">
        <div className="flex justify-between w-full text-xs uppercase tracking-widest text-muted-foreground mb-1">
          <span className="flex items-center gap-1">
            <Crosshair size={12} /> Progresso da Missão
          </span>
          <span>
            {state.riscosResolvidos} / {state.riscosTotal}
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden relative">
          <motion.div
            className="absolute h-full bg-gradient-to-r from-neon-blue to-neon-purple"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
          {/* Grid lines on opacity */}
          <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhZWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')] opacity-20" />
        </div>
      </div>

      {/* Direita: Vidas e Score */}
      <div className="flex items-center gap-6 min-w-[200px] justify-end">
        <div className="flex items-center gap-1">
          {Array.from({ length: state.vidasMax }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1 }}
            >
              <Heart
                className={`w-5 h-5 ${
                  i < state.vidas
                    ? "fill-destructive text-destructive drop-shadow-[0_0_8px_rgba(255,0,60,0.6)]"
                    : "text-muted-foreground/30"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex items-center gap-2 pl-4 border-l border-white/10">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-xl font-bold text-white">
            {state.pontuacao}
          </span>
        </div>
      </div>
    </Card>
  );
}
