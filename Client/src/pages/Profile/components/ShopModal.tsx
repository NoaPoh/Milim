import React, { useState } from 'react';
import { SwipeableDrawer } from '@mui/material';
import { AwardType } from '@prisma/client';
import AwardCard from './AwardCard/AwardCard.tsx';
import './ShopModal.scss';
import { awardTypeLabels } from '../../../constants/awards.types.ts';
import { api } from '../../../utils/trpcClient.ts';

interface Props {
  open: boolean;
  onClose: () => void;
  coinBalance: number;
  ownedAwardIds: number[];
  activeAwardNames: string[];
}

export default function ShopModal({
  open,
  onClose,
  coinBalance,
  ownedAwardIds,
  activeAwardNames,
}: Props) {
  const { data: awards = [] } =   api.award.getAll.useQuery();
  const [selectedAwardType, setSelectedAwardType] =
    useState<AwardType>('BACKGROUND_COLOR');

  const awardsToShow = awards
    .filter((a) => a.type === selectedAwardType)
    .sort((a, b) => a.price - b.price);

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
        <h2 className="title">חנות</h2>

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
                key={award.id}
                award={award}
                canAfford={
                  ownedAwardIds.includes(award.id) || coinBalance >= award.price
                }
                onClose={onClose}
                isOwned={ownedAwardIds.includes(award.id)}
                isActive={activeAwardNames.includes(award.name)}
              />
            ))
          ) : (
            <div className="empty-state">עוד אין כאן פרסים ☺️</div>
          )}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
