import React, { useState } from 'react';
import './CollectionDrawer.scss';
import { useGetCategories } from '../../../Home/hooks/useGetCategories';
import { api } from '../../../../utils/trpc';
import Loader from '../../../../components/Loader/Loader';

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  newWord: string;
  picture: string;
}

const CollectionDrawer = ({
  isOpen,
  onClose,
  newWord,
  picture,
}: CollectionDrawerProps) => {
  const { data: categories } = useGetCategories();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  const {
    isPending: saveWordInCategoryIsPending,
    mutateAsync: saveWordInCategory,
  } = api.word.saveWordInCategory.useMutation({ onSuccess: onClose });

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
  };

  const handleAddClick = async () => {
    if (selectedCategoryId === null) return;

    await saveWordInCategory({
      text: newWord,
      categoryId: selectedCategoryId,
      picture,
    });
  };

  return (
    <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className={`drawer-content ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="drawer-title">Choose a Collection</h3>
        <ul className="drawer-list">
          {categories &&
            categories.map((category) => (
              <li
                key={category.id}
                className={`drawer-item ${
                  selectedCategoryId === category.id ? 'selected' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <img
                  src={category.picture}
                  alt={category.name}
                  className="drawer-icon"
                />
                <span className="drawer-text">{category.name}</span>
              </li>
            ))}
        </ul>
        {saveWordInCategoryIsPending ? (
          <Loader />
        ) : (
          <button
            className="btn add-button"
            onClick={handleAddClick}
            disabled={
              selectedCategoryId === null || saveWordInCategoryIsPending
            }
          >
            Add To Collection
          </button>
        )}
      </div>
    </div>
  );
};

export default CollectionDrawer;
