import React from "react";
import styles from "./Card.module.css";
import clsx from "clsx";

// Define types locally to avoid import issues for now
export interface CardStats {
  attack: number;
  health: number;
  max_health: number;
}

export interface CardData {
  id: string;
  name: string;
  type: "unit" | "spell" | "action";
  cost: number;
  image: string;
  stats?: CardStats;
  tags: string[];
  description?: string;
  mechanics?: string[];
}

interface CardProps extends CardData {
  isTapped?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  name,
  image,
  isTapped,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={clsx(
        styles.card,
        isTapped && styles.tapped,
        isSelected && styles.selected
      )}
      onClick={onClick}
      title={name}
    >
      <div className={styles.imageContainer}>
        {image && <img src={image} alt={name} />}
      </div>

      {/* Stats Overlay Removed as per user request */}
    </div>
  );
};
