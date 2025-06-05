import { ClickAwayListener } from '@mui/material';
import './WordCard.scss';
import { useState } from 'react';

export interface WordCardProps {
  wordId: number;
  categoryId: number;
  originalText: string;
  translatedText: string;
  picture: string;
}

export default function WordCard(props: WordCardProps) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      <div className="WordCard__container" onClick={() => setOpenModal(true)}>
        <img
          src={props.picture}
          alt={props.originalText}
          className="object-cover"
        />
        <p>{props.translatedText}</p>
      </div>
      {openModal && (
        <div className="WordCard__modal">
          <ClickAwayListener onClickAway={() => setOpenModal(false)}>
            <div
              className="WordCard__container"
              onClick={() => setOpenModal(true)}
            >
              <img
                src={props.picture}
                alt={props.originalText}
                className="object-cover"
              />
              <p>{props.translatedText}</p>
              <button
                className="WordCard__finish-button"
                onClick={() => setOpenModal(false)}
              >
                אני יודע את זה!
              </button>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </>
  );
}
