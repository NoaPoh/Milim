import { useState } from 'react';
import Modal from '../../../../components/Modal/Modal';
import './CreateCategory.scss';
import { api } from '../../../../utils/trpcClient';
import { showSuccessToast } from '../../../../utils/toast';

interface Props {
  onClose: () => void;
}

const CreateCategoryModal = (props: Props) => {
  const apiUtils = api.useUtils();

  const [name, setName] = useState<string>('');

  const { mutateAsync: createCategory } =
    api.category.insertCategory.useMutation({
      onSuccess: () => {
        showSuccessToast('המיקום נוצר בהצלחה!');
        apiUtils.category.fetchUserCategories.invalidate();
        props.onClose();
      },
      onError: (error) => {
        showSuccessToast(error.message || 'יצירת המיקום נכשלה, אנא נסו שוב.');
      },
    });

  return (
    <Modal>
      <div className="createCategory">
        <h2>איפה אנחנו נמצאים?</h2>
        <input
          type="text"
          placeholder="שם הקטגוריה"
          className="createCategory__input"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="createCategory__buttons">
          <button className="createCategory__cancel" onClick={props.onClose}>
            ביטול
          </button>
          <button
            disabled={!name}
            className="createCategory__save"
            onClick={() => createCategory({ name })}
          >
            שמור
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateCategoryModal;
