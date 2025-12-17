import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { Shield, Timer, Layers, Trash2 } from "lucide-react";

interface MainMenuProps {
  onStart: () => void;
  isLoading?: boolean;
}

export function MainMenu({ onStart, isLoading }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center z-10 relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <Shield className="w-16 h-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
          SST
        </h1>
        <p className="text-xl font-light text-primary tracking-[0.5em] uppercase mt-2">
          Protocolo de Segurança
        </p>
      </motion.div>

      <Card className="max-w-md w-full p-8 mb-8 backdrop-blur-xl bg-black/60 border-primary/20">
        <h3 className="text-xl font-bold mb-6 text-white flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          Diretrizes da Missão
        </h3>

        <ul className="space-y-4 text-left text-gray-300">
          <li className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <Layers size={18} />
            </div>
            <div>
              <strong className="text-white block">Neutralize Riscos</strong>
              <span className="text-sm">
                Preencha os slots requeridos com suas cartas.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <Timer size={18} />
            </div>
            <div>
              <strong className="text-white block">Gerencie o Tempo</strong>
              <span className="text-sm">
                O relógio não para. Seja rápido ou falhe.
              </span>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="p-2 rounded bg-primary/10 text-primary">
              <Trash2 size={18} />
            </div>
            <div>
              <strong className="text-white block">Descarte Estratégico</strong>
              <span className="text-sm">
                Mão cheia? Jogue fora o que não presta.
              </span>
            </div>
          </li>
        </ul>
      </Card>

      <Button
        size="lg"
        onClick={onStart}
        isLoading={isLoading}
        className="w-full max-w-xs text-lg h-16 shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_50px_rgba(0,243,255,0.6)] font-bold tracking-wider"
      >
        INICIAR PROTOCOLO
      </Button>

      <div className="absolute bottom-4 text-xs text-gray-600 font-mono">
        SYSTEM VERSION 2.0.4 // VISIONARY
      </div>
    </div>
  );
}
