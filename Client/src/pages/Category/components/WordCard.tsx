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
          </div>
        </div>
      )}
    </>
  );
}
