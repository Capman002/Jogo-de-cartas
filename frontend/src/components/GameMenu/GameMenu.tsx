import React, { useState } from "react";
import { Menu, BookOpen, Layers } from "lucide-react";
import styles from "./GameMenu.module.css";

interface GameMenuProps {
  onOpenDeck: () => void;
  onOpenRules: () => void;
}

export const GameMenu: React.FC<GameMenuProps> = ({
  onOpenDeck,
  onOpenRules,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.menuContainer}>
      <button
        className={styles.menuButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Menu"
      >
        <Menu size={24} color="#fff" />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.menuItem}
            onClick={() => {
              onOpenDeck();
              setIsOpen(false);
            }}
          >
            <Layers size={18} />
            <span>Ver Deck</span>
          </button>
          <button
            className={styles.menuItem}
            onClick={() => {
              onOpenRules();
              setIsOpen(false);
            }}
          >
            <BookOpen size={18} />
            <span>Como Jogar</span>
          </button>
        </div>
      )}
    </div>
  );
};
