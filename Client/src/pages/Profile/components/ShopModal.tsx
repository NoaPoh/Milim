import React, { useState } from 'react';
import { useAwards } from '../hooks/useAwards';
import { SwipeableDrawer } from '@mui/material';
import { AwardType } from '@prisma/client';
import AwardCard from './AwardCard/AwardCard.tsx';
import { api } from '../../../utils/trpcClient';
import './ShopModal.scss';

const awardTypeLabels: Record<AwardType, string> = {
  BACKGROUND_COLOR: 'Habitat',
  PROFILE_ICON: 'Spirit Animal',
  ICON_BACKGROUND: 'Animal Background',
  ICON_FRAME: 'Frames',
};

export default function ShopModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: awards = [] } = useAwards();
  const [selectedType, setSelectedType] = useState<AwardType>('BACKGROUND_COLOR');
  const { data: user } = api.auth.getMe.useQuery();
  const coinBalance = user?.coinBalance ?? 0;

  const filtered = awards.filter((a) => a.category === selectedType);

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
              onClick={() => setSelectedType(key as AwardType)}
              className={selectedType === key ? 'active' : ''}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="awards-grid">
          {filtered.length ? (
            filtered.map((award) => (
              <AwardCard
                key={award.id}
                award={award}
                canAfford={coinBalance >= award.price}
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
