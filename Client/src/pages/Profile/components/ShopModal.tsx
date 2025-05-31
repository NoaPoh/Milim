import React, { useState } from 'react';
import { useAwards } from '../hooks/useAwards';
import { SwipeableDrawer } from '@mui/material';
import { AwardType } from '@prisma/client';
import AwardCard from './AwardCard/AwardCard.tsx';
import './ShopModal.scss';
import { awardTypeLabels } from '../../../constants/awards.types.ts';

interface Props {
  open: boolean;
  onClose: () => void;
  coinBalance: number;
  ownedAwardIds: number[];
  activeAwardNames: number[];
}

export default function ShopModal({ open, onClose, coinBalance, ownedAwardIds, activeAwardNames }: Props) {
  const { data: awards = [] } = useAwards();
  const [selectedAwardType, setSelectedAwardType] = useState<AwardType>('BACKGROUND_COLOR');

  const awardsToShow = awards.filter((a) => a.category === selectedAwardType).sort((a, b) => a.price - b.price);

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      PaperProps={{
        sx: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: '70vh',
        },
      }}
    >
      <div className="shop-modal">
        <h2 className="title">Shop</h2>

        <div className="tabs">
          {Object.entries(awardTypeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedAwardType(key as AwardType)}
              className={selectedAwardType === key ? 'active' : ''}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="awards-grid">
          {awardsToShow.length ? (
            awardsToShow.map((award) => (
              <AwardCard
                disabled={ownedAwardIds.includes(award.id)}
                key={award.id}
                award={award}
                canAfford={coinBalance >= award.price}
                onClose={onClose}
                isOwned={ownedAwardIds.includes(award.id)}
                isActive={activeAwardNames.includes(award.name)}
              />
            ))
          ) : (
            <div className="empty-state">Nothing to see here ☺️</div>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
