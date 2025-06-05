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

export default function AwardCard({
  award,
  canAfford,
  onClose,
  isOwned,
  isActive,
}: AwardCardProps) {
  const apiUtils = api.useUtils();

  const refreshUser = async () => {
    await apiUtils.user.getUser.invalidate();
    await apiUtils.award.getAll.invalidate();
    onClose?.();
  };

  const { mutate: purchaseAward, isPending } = api.award.purchase.useMutation({
    onSuccess: async () => {
      if (refreshUser) await refreshUser();
      showSuccessToast(`award purchased <3`);
    },
    onError: () => {
      showErrorToast('Error purchasing award :(');
    },
  });

  const { mutate: activateAward, isPending: isUsing } =
    api.award.activateAward.useMutation({
      onSuccess: async () => {
        if (refreshUser) await refreshUser();
        showSuccessToast(`award enabled <3`);
      },
      onError: () => {
        showErrorToast('Error using award :(');
        if (onClose) onClose();
      },
    });

  const handleUse = () => {
    if (!isOwned || isUsing) return;
    activateAward({ awardId: award.id });
  };

  const handlePurchase = () => {
    if (!canAfford || isPending) return;
    purchaseAward({ awardId: award.id });
  };
  const isCardDisabled = isActive || !canAfford;

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
      ) : (
        <button
          onClick={handlePurchase}
          disabled={!canAfford || isOwned}
          className={`award-price-button ${canAfford ? 'active' : 'disabled'}`}
        >
          <FontAwesomeIcon icon={faCoins} className="text-yellow-500" />
          <span>{award.price}</span>
        </button>
      )}
    </div>
  );
}
