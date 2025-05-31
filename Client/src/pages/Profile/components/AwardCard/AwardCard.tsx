import React from 'react';
import { Award } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import './AwardCard.scss';
import { api } from '../../../../utils/trpcClient';
import { showErrorToast, showSuccessToast } from '../../../../utils/toast.ts';

interface AwardCardProps {
  award: Award;
  canAfford: boolean;
  onClose?: () => void;
  isOwned: boolean;
  isActive: boolean;
}

export default function AwardCard({ award, canAfford }: AwardCardProps) {
  return (
    <div className={`award-card ${isCardDisabled ? 'disabled' : ''}`}>
      <div className="award-left">
        {award.iconUrl ? (
          <img src={`src/assets/images/${award.iconUrl}`} alt={award.name} />
        ) : (
          <div className="placeholder" />
        )}
        <div className="award-name">{award.name}</div>
      </div>

      {isOwned ? (
        <button
          onClick={handleUse}
          disabled={isActive}
          className="award-price-button active use-button"
        >
          Use
        </button>
      ) : (<button
        onClick={handlePurchase}
        disabled={!canAfford || isOwned}
        className={`award-price-button ${canAfford ? 'active' : 'disabled'}`}
      >
        <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
        <span>{award.price}</span>
      </button>)}
    </div>
  );
}
