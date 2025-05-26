import React, { useState, useEffect } from 'react';
import { useAwards } from '../hooks/useAwards';
import { Dialog, SwipeableDrawer } from '@mui/material';
import { AwardType, Award } from '@prisma/client';
import AwardCard from './award/Award.tsx';
import { api } from '../../../utils/trpcClient';

const awardTypeLabels: Record<AwardType, string> = {
  BACKGROUND_COLOR: 'Habitat',
  PROFILE_ICON: 'Spirit Animal',
  ICON_BACKGROUND: 'Animal Background',
  ICON_FRAME: 'Frames',
};

export default function AwardModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { data: awards = [], isLoading } = useAwards(); // ✅ RIGHT PLACE
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

    <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Shop</h2>

        <div className="flex gap-3 mb-6">
          {Object.entries(awardTypeLabels).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedType(key as AwardType)}
              className={
                selectedType === key
                  ? 'px-1.5 py-1 text-sm rounded-md font-medium border bg-gray-300 text-black'
                  : 'px-1.5 py-1 text-sm rounded-md font-medium border bg-white text-gray-600 hover:bg-gray-100'
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filtered.length ? filtered.map((award) => (
            <AwardCard key={award.id} award={award} canAfford={coinBalance >= award.price} />
          )): <div className="text-center text-gray-600">Nothing to see here ☺️
          </div>}
        </div>
      </div>
    </SwipeableDrawer>
  );
}
