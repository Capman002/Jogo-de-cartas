import React, { useEffect, useRef, useState } from "react";
import styles from "./GameTable.module.css";
import { Card } from "../Card/Card";
import { PlayerAvatar } from "../PlayerAvatar/PlayerAvatar";
import { Modal } from "../Modal/Modal";
import { GameMenu } from "../GameMenu/GameMenu";
import gsap from "gsap";
import clsx from "clsx";
import Lenis from "lenis";
import { Heart, Shield, Zap, Timer as TimerIcon } from "lucide-react";
import type { CardData, PlayerState } from "../../gameTypes";
import { PLAYER_DECK, BOT_DECK, ALL_CARDS } from "../../data/mockCards";

// Helper to shuffle
const shuffle = (array: CardData[]) =>
  [...array].sort(() => Math.random() - 0.5);

export const GameTable: React.FC = () => {
  const handRef = useRef<HTMLDivElement>(null);

  // Game State
  const [turn, setTurn] = useState(1);
  const [phase, setPhase] = useState<"player" | "bot">("player");
  const [turnTime, setTurnTime] = useState(225);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Modals State
  const [isDeckOpen, setIsDeckOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Player State
  const [player, setPlayer] = useState<PlayerState>({
    id: 1,
    health: 30,
    maxHealth: 30,
    energy: 3,
    maxEnergy: 3,
    hand: [],
    field: [],
    deck: shuffle(PLAYER_DECK),
    graveyard: [],
  });

  // Bot State
  const [bot, setBot] = useState<PlayerState>({
    id: 2,
    health: 30,
    maxHealth: 30,
    energy: 3,
    maxEnergy: 3,
    hand: [],
    field: [],
    deck: shuffle(BOT_DECK),
    graveyard: [],
  });

  // Initialization
  useEffect(() => {
    // Draw initial hands (4 cards)
    const initialDraw = (deck: CardData[], count: number) => {
      const drawn = deck.slice(0, count);
      const remaining = deck.slice(count);
      return { drawn, remaining };
    };

    const pDraw = initialDraw(player.deck, 4);
    const bDraw = initialDraw(bot.deck, 4);

    setPlayer((p) => ({ ...p, hand: pDraw.drawn, deck: pDraw.remaining }));
    setBot((b) => ({ ...b, hand: bDraw.drawn, deck: bDraw.remaining }));

    // Animations
    if (handRef.current) {
      gsap.fromTo(
        handRef.current.children,
        { y: 150, opacity: 0, rotation: -10 },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []); // Run once

  // Timer
  useEffect(() => {
    const timer = setInterval(
      () => setTurnTime((t) => Math.max(0, t - 1)),
      1000
    );
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  // Handlers
  const handleCardClick = (card: CardData) => {
    if (phase !== "player") return;

    if (selectedCardId === card.id) {
      setSelectedCardId(null);
    } else {
      setSelectedCardId(card.id);
    }
  };

  const handleFieldClick = () => {
    // Play card logic
    if (phase === "player" && selectedCardId) {
      const cardToPlay = player.hand.find((c) => c.id === selectedCardId);
      if (cardToPlay && player.energy >= cardToPlay.cost) {
        // Move to field
        setPlayer((prev) => ({
          ...prev,
          hand: prev.hand.filter((c) => c.id !== selectedCardId),
          field: [...prev.field, cardToPlay],
          energy: prev.energy - cardToPlay.cost,
        }));
        setSelectedCardId(null);
      } else {
        // Not enough energy or invalid
        console.log("Not enough energy or card not found");
      }
    }
  };

  const handleEndTurn = () => {
    if (phase === "player") {
      setPhase("bot");
      // Bot Logic Trigger
      setTimeout(executeBotTurn, 1000);
    }
  };

  const executeBotTurn = () => {
    // Simple Bot AI
    setBot((prevBot) => {
      // 1. Draw card
      const [drawnCard, ...remainingDeck] = prevBot.deck;
      let newHand = [...prevBot.hand];
      let newDeck = remainingDeck;

      if (drawnCard) {
        newHand.push(drawnCard);
      }

      // 2. Play random affordable card
      let currentEnergy = prevBot.energy;
      let newField = [...prevBot.field];

      // Try to play cards until out of energy
      const playable = newHand.filter((c) => c.cost <= currentEnergy);
      if (playable.length > 0) {
        const toPlay = playable[0]; // Just play the first one for now
        newHand = newHand.filter((c) => c.id !== toPlay.id);
        newField.push(toPlay);
        currentEnergy -= toPlay.cost;
      }

      return {
        ...prevBot,
        hand: newHand,
        field: newField,
        deck: newDeck,
        energy: currentEnergy,
      };
    });

    // End Bot Turn -> Start Player Turn
    setTimeout(() => {
      setPhase("player");
      setTurn((t) => t + 1);
      // Reset Energy and Draw for Player
      setPlayer((p) => {
        const maxEnergy = Math.min(10, p.maxEnergy + 1);
        const [drawn, ...restDeck] = p.deck;
        const newHand = drawn ? [...p.hand, drawn] : p.hand;
        return {
          ...p,
          maxEnergy,
          energy: maxEnergy,
          hand: newHand,
          deck: restDeck,
        };
      });
      // Reset Bot Energy
      setBot((b) => ({
        ...b,
        maxEnergy: Math.min(10, b.maxEnergy + 1),
        energy: Math.min(10, b.maxEnergy + 1),
      }));
    }, 2000);
  };

  return (
    <div
      className={styles.gameTable}
      onClick={() => selectedCardId && handleFieldClick()}
    >
      {/* --- Menu --- */}
      <GameMenu
        onOpenDeck={() => setIsDeckOpen(true)}
        onOpenRules={() => setIsRulesOpen(true)}
      />

      {/* --- Modals --- */}
      <Modal
        isOpen={isDeckOpen}
        onClose={() => setIsDeckOpen(false)}
        title="Seu Deck"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {player.deck.length === 0 ? (
            <p style={{ color: "#888", textAlign: "center", width: "100%" }}>
              Seu deck está vazio.
            </p>
          ) : (
            player.deck.map((card, i) => (
              <div key={i} style={{ transform: "scale(0.9)" }}>
                <Card {...card} />
              </div>
            ))
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
        title="Como Jogar"
      >
        <div style={{ color: "#ddd", lineHeight: "1.6", fontSize: "16px" }}>
          <h3 style={{ color: "#fff", marginBottom: "10px" }}>
            1. O Conceito Assimétrico
          </h3>
          <p>
            <strong>Você (Gestor):</strong> Joga defensivamente para proteger a
            vida da sua equipe ("Integridade"). Seu deck só tem Soluções.
          </p>
          <p>
            <strong>O Bot (O Risco):</strong> Joga ofensivamente para causar
            acidentes. O deck dele só tem Problemas.
          </p>

          <h3
            style={{ color: "#fff", marginTop: "20px", marginBottom: "10px" }}
          >
            2. Objetivos
          </h3>
          <p>
            <strong>Sua Vida (Integridade):</strong> 30 pontos. Se chegar a 0,
            Game Over.
          </p>
          <p>
            <strong>Vida do Bot (Risco):</strong> 30 pontos. Reduza a 0 para
            vencer.
          </p>

          <h3
            style={{ color: "#fff", marginTop: "20px", marginBottom: "10px" }}
          >
            3. Mecânica de Cores
          </h3>
          <p>
            Se você bloquear um ataque usando um EPI da{" "}
            <strong>MESMA COR</strong> (Tag) do Risco, você ganha um bônus
            massivo e reflete dano.
          </p>

          <h3
            style={{ color: "#fff", marginTop: "20px", marginBottom: "10px" }}
          >
            4. Turnos
          </h3>
          <p>
            Use sua <strong>Energia</strong> para baixar EPIs e EPCs. Proteja-se
            dos ataques do Bot e sobreviva aos riscos!
          </p>
        </div>
      </Modal>

      {/* --- Opponent Zone (Top Right) --- */}
      <div className={styles.opponentZone}>
        <div className={styles.resources}>
          <div className={styles.resourceCircle} title="Risk Index">
            <Heart size={16} color="#ff4444" /> {bot.health}
          </div>
          <div className={styles.resourceCircle} title="Cards in Hand">
            <Shield size={16} color="#4488ff" /> {bot.hand.length}
          </div>
          <div className={styles.resourceCircle} title="Energy">
            <Zap size={16} color="#ffcc00" /> {bot.energy}
          </div>
        </div>

        <PlayerAvatar
          name="The Risk"
          image="/cartas/Martelo_Solto.avif"
          health={bot.health}
          isActive={phase === "bot"}
        />
      </div>

      {/* --- Battlefield (Center) --- */}
      <div className={styles.field}>
        {/* Opponent Row */}
        <div className={clsx(styles.row, styles.opponentRow)}>
          {bot.field.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>

        {/* Player Row */}
        <div className={clsx(styles.row, styles.playerRow)}>
          {player.field.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </div>

      {/* --- Player Zone (Bottom) --- */}
      <div className={styles.playerZone}>
        {/* Deck (Bottom Left) */}
        <div className={styles.deck} onClick={() => setIsDeckOpen(true)}>
          <div
            style={{
              position: "absolute",
              top: -20,
              color: "#fff",
              width: "100%",
              textAlign: "center",
            }}
          >
            {player.deck.length}
          </div>
        </div>

        {/* Hand (Bottom Center) */}
        <div
          className={styles.hand}
          ref={handRef}
          onClick={(e) => e.stopPropagation()}
        >
          {player.hand.map((card, index) => {
            const total = player.hand.length;
            const center = (total - 1) / 2;
            const distFromCenter = index - center;

            // Dynamic Scale: Start shrinking if > 4 cards, min 0.65
            const scale =
              total > 4 ? Math.max(0.65, 1 - (total - 4) * 0.08) : 1;

            // Dynamic Overlap: Increase overlap as cards get smaller/more numerous
            const overlap = total > 4 ? -(40 * scale) : -15;

            return (
              <div
                key={card.id}
                style={{
                  transform: `translateY(${
                    Math.abs(distFromCenter) * (12 * scale)
                  }px) rotate(${distFromCenter * 3}deg) scale(${scale})`,
                  zIndex: index,
                  marginLeft: index === 0 ? 0 : `${overlap}px`,
                  transformOrigin: "bottom center",
                  transition: "all 0.3s ease",
                }}
              >
                <Card
                  {...card}
                  isSelected={selectedCardId === card.id}
                  onClick={() => handleCardClick(card)}
                />
              </div>
            );
          })}
        </div>

        {/* Controls (Bottom Right) */}
        <div className={styles.rightControls}>
          <div className={styles.timer}>
            <TimerIcon size={24} style={{ marginRight: 8, opacity: 0.7 }} />
            {formatTime(turnTime)}{" "}
            <span style={{ fontSize: 14, marginLeft: 10, opacity: 0.5 }}>
              Turn {turn}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
            <div className={styles.graveyard}>GY</div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "16px",
              }}
            >
              <button
                className={styles.endTurnBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEndTurn();
                }}
                disabled={phase !== "player"}
                style={{ opacity: phase === "player" ? 1 : 0.5 }}
              >
                End Turn
              </button>

              <div className={styles.statsRow}>
                <div className={styles.resources}>
                  <div className={styles.resourceCircle} title="Integrity">
                    <Heart size={16} color="#ff4444" /> {player.health}
                  </div>
                  <div className={styles.resourceCircle} title="Field">
                    <Shield size={16} color="#4488ff" /> {player.field.length}
                  </div>
                  <div className={styles.resourceCircle} title="Energy">
                    <Zap size={16} color="#ffcc00" /> {player.energy}/
                    {player.maxEnergy}
                  </div>
                </div>
                <PlayerAvatar
                  name="Manager"
                  image="/cartas/Capacete_com_Jugular.avif"
                  health={player.health}
                  isActive={phase === "player"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
