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
        <div className="WordCard__modal">
          {/* <ClickAwayListener onClickAway={() => props.closeModal()}> */}
          <div
            className="WordCard__container"
            onClick={() => props.closeModal()}
          >
            <img
              src={props.picture}
              alt={props.originalText}
              className="object-cover"
            />
            <p>{props.translatedText}</p>
            <button
              className="WordCard__finish-button"
              onClick={() => props.closeModal()}
            >
              אני יודע את זה!
            </button>
          </div>
          {/* </ClickAwayListener> */}
        </div>
      )}
    </>
  );
};
