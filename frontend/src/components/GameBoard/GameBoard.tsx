import type { GameState, SolutionCard, ActiveRisk } from "../../types/game";
import { RiskCard } from "../RiskCard/RiskCard";
import { EPCSlot } from "../EPCSlot/EPCSlot";
import "./GameBoard.css";

interface GameBoardProps {
  gameState: GameState;
  selectedCard: SolutionCard | null;
  onClickRisk: (riskInstanceId: string) => void;
  onClickInstallZone: (lane: number) => void;
}

export function GameBoard({
  gameState,
  selectedCard,
  onClickRisk,
  onClickInstallZone,
}: GameBoardProps) {
  const { riscosAtivos, epcsInstalados } = gameState;

  // Agrupar riscos por lane
  const risksByLane: Record<number, ActiveRisk[]> = { 0: [], 1: [], 2: [] };
  riscosAtivos.forEach((risk) => {
    if (risksByLane[risk.lane]) {
      risksByLane[risk.lane].push(risk);
    }
  });

  // Nomes das lanes (setores da fábrica)
  const laneNames = ["Produção A", "Montagem B", "Armazém C"];

  return (
    <div className="game-board">
      {/* 3 Lanes */}
      {[0, 1, 2].map((lane) => (
        <div key={lane} className="lane">
          {/* Cabeçalho da Lane */}
          <div className="lane-header">
            <span className="lane-name">{laneNames[lane]}</span>
            <span className="lane-indicator">SETOR {lane + 1}</span>
          </div>

          {/* Zona de Spawn */}
          <div className="lane-zone spawn-zone">
            <span className="zone-label">⚠️ RISCOS</span>
          </div>

          {/* Área de descida dos riscos */}
          <div className="lane-content">
            {risksByLane[lane].map((risk) => (
              <RiskCard
                key={risk.instanceId}
                risk={risk}
                isTargetable={
                  selectedCard !== null && selectedCard.tipo !== "EPC"
                }
                onClick={() => onClickRisk(risk.instanceId)}
              />
            ))}
          </div>

          {/* Zona de Instalação (EPCs) */}
          <div
            className={`lane-zone install-zone ${
              selectedCard?.tipo === "EPC" ? "highlight" : ""
            }`}
            onClick={() =>
              selectedCard?.tipo === "EPC" && onClickInstallZone(lane)
            }
          >
            <span className="zone-label">🔧 INSTALAÇÃO</span>
            <div className="epc-slots">
              {epcsInstalados
                .filter((epc) => epc.lane === lane)
                .map((epc) => (
                  <EPCSlot key={epc.instanceId} epc={epc} />
                ))}
            </div>
          </div>

          {/* Zona do Trabalhador */}
          <div className="lane-zone worker-zone">
            <span className="worker-icon">👷</span>
            <span className="zone-label">TRABALHADOR</span>
          </div>
        </div>
      ))}
    </div>
  );
}
