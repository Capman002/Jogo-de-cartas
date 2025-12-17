import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Trophy, RotateCcw, Clock } from "lucide-react";
import { GameState } from "../../types/game";

interface VictoryScreenProps {
  state: GameState;
  onRestart: () => void;
}

export function VictoryScreen({ state, onRestart }: VictoryScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
      <div className="absolute inset-0 bg-neon-green/5 z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 relative z-10"
      >
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-40 animate-pulse" />
          <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-4 relative z-10" />
        </div>

        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 tracking-widest uppercase">
          Missão Cumprida
        </h1>
        <p className="text-xl text-yellow-500/80 mt-2">
          Todos os riscos foram neutralizados
        </p>
      </motion.div>

      <Card className="max-w-sm w-full p-8 mb-8 border-yellow-500/30 bg-black/80 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <span className="text-yellow-400 font-bold text-3xl">
              {state.pontuacao}
            </span>
            <span className="text-xs uppercase tracking-wider opacity-70">
              Score Final
            </span>
          </div>
          <div className="flex flex-col p-4 bg-neon-blue/10 rounded-lg border border-neon-blue/20">
            <div className="flex items-center justify-center gap-1 text-neon-blue font-bold text-2xl">
              <Clock size={20} />
              {Math.floor(state.tempoTotal / 60)}:
              {Math.floor(state.tempoTotal % 60)
                .toString()
                .padStart(2, "0")}
            </div>
            <span className="text-xs uppercase tracking-wider opacity-70">
              Tempo Sobra
            </span>
          </div>
        </div>
      </Card>

      <Button
        variant="outline"
        size="lg"
        onClick={onRestart}
        className="w-full max-w-xs h-14 relative z-10 gap-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black"
      >
        <RotateCcw size={20} />
        NOVA OPERAÇÃO
      </Button>
    </div>
  );
}
