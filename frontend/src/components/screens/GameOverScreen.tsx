import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { AlertOctagon, RotateCcw } from "lucide-react";

import { GameState } from "../../types/game";

interface GameOverProps {
  state: GameState;
  onRetry: () => void;
}

export function GameOverScreen({ state, onRetry }: GameOverProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
      <div className="absolute inset-0 bg-red-500/5 z-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-8 relative z-10"
      >
        <AlertOctagon className="w-24 h-24 text-destructive mx-auto mb-4 animate-bounce" />
        <h1 className="text-5xl font-black text-destructive tracking-widest uppercase">
          Falha Crítica
        </h1>
        <p className="text-xl text-destructive/80 mt-2">
          Protocolo de segurança comprometido
        </p>
      </motion.div>

      <Card className="max-w-sm w-full p-8 mb-8 border-destructive/30 bg-black/80 relative z-10">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col p-4 bg-destructive/10 rounded-lg">
            <span className="text-destructive font-bold text-3xl">
              {state.pontuacao}
            </span>
            <span className="text-xs uppercase tracking-wider opacity-70">
              Pontos
            </span>
          </div>
          <div className="flex flex-col p-4 bg-destructive/10 rounded-lg">
            <span className="text-destructive font-bold text-3xl">
              {state.riscosResolvidos}/{state.riscosTotal}
            </span>
            <span className="text-xs uppercase tracking-wider opacity-70">
              Riscos
            </span>
          </div>
        </div>
      </Card>

      <Button
        variant="destructive"
        size="lg"
        onClick={onRetry}
        className="w-full max-w-xs h-14 relative z-10 gap-2"
      >
        <RotateCcw size={20} />
        REINICIAR SISTEMA
      </Button>
    </div>
  );
}
