import Modal from '../../../../components/Modal/Modal';
import SpeakerButton from '../../../../components/SpeakerButton.tsx';

export interface ClickedWord {
  wordId: number;
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
          <div className="WordCard__container WordCard__modal">
            <img
              src={props.picture}
              alt={props.originalText}
              className="object-cover"
            />
            <p>{props.translatedText}</p>
            <div className="english-row">
              <p>{props.originalText}</p>
              <SpeakerButton text={props.originalText} language="en-US" />
            </div>
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
