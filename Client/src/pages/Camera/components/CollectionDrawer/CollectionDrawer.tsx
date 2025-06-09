import { useEffect, useState } from 'react';
import './CollectionDrawer.scss';
import { useGetCategories } from '../../../Home/hooks/useGetCategories';
import { api } from '../../../../utils/trpcClient';
import { showErrorToast, showSuccessToast } from '../../../../utils/toast';
import { useNavigate } from 'react-router-dom';
import { RoutesValues } from '../../../../routes/routes.ts';

interface CollectionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  originalText: string;
  translatedText: string;
  picture: string;
}

const CollectionDrawer = ({
  isOpen,
  onClose,
  originalText,
  translatedText,
  picture,
}: CollectionDrawerProps) => {
  const { data: categories } = useGetCategories(isOpen, translatedText);
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const selectedCategory = categories?.find(
    (category) => category.id === selectedCategoryId
  );
  const handleSuccess = () => {
    showSuccessToast(`מילה נוספה לאוסף ${selectedCategory?.name}!`);
    navigate(`${RoutesValues.CATEGORY}/${selectedCategory?.id}`);
    onClose();
  };
  const handleError = () => {
    showErrorToast(`לא הצלחנו להוסיף את המילה לאוסף 😭`);
    onClose();
  };

  const {
    isPending: saveWordInCategoryIsPending,
    mutateAsync: saveWordInCategory,
  } = api.word.saveWordInCategory.useMutation({
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const handleCategoryClick = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    console.log(
      `Selected category ID: ${categoryId}, Category name: ${
        categories?.find((cat) => cat.id === categoryId)?.name
      }`
    );
  };

  useEffect(()=>{console.log(selectedCategoryId)},[selectedCategoryId]);

  const handleAddClick = async () => {
    if (selectedCategoryId === null) return;

    await saveWordInCategory({
      originalText,
      translatedText,
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
        <h3 className="drawer-title">בחר אוסף</h3>
        <ul className="drawer-list">
          {categories &&
            categories.map((category) => (
              <li
                key={category.id}
                className={`drawer-item ${
                  selectedCategoryId === category.id ? 'selected' : ''
                }`}
                onClick={() => handleCategoryClick(category.id)}
                aria-disabled={category.hasThisWord}
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
        {!saveWordInCategoryIsPending && (
          <button
            className="btn add-button"
            onClick={handleAddClick}
            disabled={
              selectedCategoryId === null || saveWordInCategoryIsPending
            }
          >
            הוסף לאוסף
          </button>
        )}
      </div>
    </div>
  );
};

export default CollectionDrawer;
