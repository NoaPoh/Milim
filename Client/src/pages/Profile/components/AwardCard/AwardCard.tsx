import React from 'react';
import { Award } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import './AwardCard.scss';

interface AwardCardProps {
  award: Award;
  canAfford: boolean;
}

export default function AwardCard({ award, canAfford }: AwardCardProps) {
  return (
    <div className={`award-card ${!canAfford ? 'disabled' : ''}`}>
      <div className="award-left">
        {award.iconUrl ? (
          <img src={`src/assets/images/${award.iconUrl}`} alt={award.name} />
        ) : (
          <div className="placeholder" />
        )}
        <div className="award-name">{award.name}</div>
      </div>

      <button
        disabled={!canAfford}
        className={`award-price-button ${canAfford ? 'active' : 'disabled'}`}
      >
        <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
        <span>{award.price}</span>
      </button>
    </div>
  );
}
