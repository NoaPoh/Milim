import Modal from '../../../../components/Modal/Modal';
import SpeakerButton from '../../../../components/SpeakerButton.tsx';

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
            className="WordCard__container WordCard__modal">
            <img
              src={props.picture}
              alt={props.originalText}
              className="object-cover"
            />
            <div className="hebrew-row">
              <p>{props.translatedText}</p>
              <SpeakerButton text={props.translatedText} language="he-IL" />
            </div>
            <p>{props.originalText}</p>
            <button
              className="WordCard__finish-button"
              onClick={() => props.closeModal()}
            >
              אני יודע את זה!
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
