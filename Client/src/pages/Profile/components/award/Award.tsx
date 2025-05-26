import React from 'react';
import { Award } from '@prisma/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

interface AwardCardProps {
  award: Award;
  canAfford: boolean;
}

export default function AwardCard({ award, canAfford }: AwardCardProps) {
  return (
    <div
      className={
        `border rounded p-4 flex justify-between items-center gap-4 transition',
      ${!canAfford && 'opacity-50 cursor-not-allowed'}`
      }
    >
      {award.iconUrl ? (
        <img src={`src/assets/images/${award.iconUrl}`} alt={award.name} className="w-12 h-12 rounded" />
      ) : (
        <div className="w-12 h-12 bg-gray-200 rounded" />
      )}

      <div className="flex-1 flex">
        <div className="font-semibold text-base">{award.name}</div>
        <div className="ml-auto">
          <button
            disabled={!canAfford}
            className={
              canAfford
                ? 'flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                : 'flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium bg-gray-100 text-gray-400 cursor-not-allowed'
            }
          >
            <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
            <span>{award.price}</span>
          </button>
        </div>

      </div>
    </div>
  );
}

