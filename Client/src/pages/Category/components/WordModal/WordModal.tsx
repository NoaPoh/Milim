import Modal from '../../../../components/Modal/Modal';

export interface ClickedWord {
  wordId: number;
  categoryId: number;
  originalText: string;
  translatedText: string;
  picture: string;
}

export interface WordModalProps extends ClickedWord {
  closeModal: () => void;
}

export const WordModal = (props: WordModalProps) => {
  return (
    <>
      {props.wordId && (
        <Modal>
          <div
            className="WordCard__container WordCard__modal"
            onClick={() => props.closeModal()}
          >
            <img
              src={props.picture}
              alt={props.originalText}
              className="object-cover"
            />
            <p>{props.originalText}</p>
            <button
              className="WordCard__finish-button"
              onClick={() => props.closeModal()}
            >
              עליתי על זה!
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
