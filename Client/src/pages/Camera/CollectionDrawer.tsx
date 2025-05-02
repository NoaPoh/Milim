import React from 'react';
import './CollectionDrawer.scss';
import { useGetCategories } from '../Home/hooks/useGetCategories';
import { trpc } from '../../utils/trpc';
// import { categories } from '../Home/Home';

const CollectionDrawer = ({
  isOpen,
  onClose,
  newWord,
  picture,
}: {
  isOpen: boolean;
  onClose: () => void;
  newWord: string;
  picture: string;
}) => {
  const { data: categories } = useGetCategories();

  const {
    isPending: saveWordInCategoryIsPending,
    mutateAsync: saveWordInCategory,
  } = trpc.word.saveWordInCategory.useMutation({ onSuccess: onClose });

  const handleCategoryClick = async (category: number) => {
    await saveWordInCategory({
      text: newWord,
      categoryId: category,
      picture: picture,
    });
    // Handle category click here
    console.log('Category clicked:', category);
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
              <>
                <li
                  key={category.name}
                  className="drawer-item"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <img
                    src={category.picture}
                    alt={category.name}
                    className="drawer-icon"
                  />
                  <span className="drawer-text">{category.name}</span>
                </li>{' '}
              </>
            ))}
          {/* <button className="btn" onClick={() => handleCategoryClick(1)}>
            add
          </button> */}
        </ul>
      </div>
    </div>
  );
};

export default CollectionDrawer;
