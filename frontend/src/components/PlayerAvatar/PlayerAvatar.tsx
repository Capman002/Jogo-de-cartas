import React from "react";
import styles from "./PlayerAvatar.module.css";
import clsx from "clsx";

interface PlayerAvatarProps {
  name: string;
  image: string;
  health: number;
  isActive?: boolean;
}
  
export const PlayerAvatar: React.FC<PlayerAvatarProps> = ({
  name,
  image,
  health,
  isActive,
}) => {
  return (
    <div className={styles.container}>
      <div className={clsx(styles.avatarWrapper, isActive && styles.active)}>
        <div className={styles.health}>{health}</div>
        <div className={styles.avatarImage}>
          <img src={image} alt={name} />
        </div>
      </div>
      <div className={styles.name}>{name}</div>
    </div>
  );
};
