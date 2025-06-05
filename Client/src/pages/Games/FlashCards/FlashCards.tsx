import { useEffect, useState } from 'react';
import './FlashCards.scss';

type CardClass = '' | 'chosen' | 'correct' | 'wrong';

type Word = {
  id: number;
  originalText: string;
  picture: string;
};

type FlashCardsProps = {
  roundWords: Word[];
  correctId: number;
  onNextRound: (correct: boolean) => void;
};

const FlashCards = ({
  roundWords,
  correctId,
  onNextRound,
}: FlashCardsProps) => {
  const [chosenId, setChosenId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  console.log('FlashCards component rendered with roundWords:', roundWords);

  useEffect(() => {
    setChosenId(null);
    setSubmitted(false);
  }, [roundWords]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    if (chosenId !== null) {
      const isCorrect = chosenId === correctId;
      onNextRound(isCorrect);
    }
  };

  const getCardClass = (id: number): CardClass => {
    if (!submitted) return id === chosenId ? 'chosen' : '';
    if (id === correctId) return 'correct';
    if (id === chosenId && id !== correctId) return 'wrong';
    return '';
  };

  const correctSrc = roundWords.find((word) => word.id === correctId)?.picture;

  return (
    <div className="flashcards-page">
      <img
        src={correctSrc}
        className="flashcards-page__image"
        alt="Guess the word"
      />
      <div className="flashcards-container">
        {roundWords.map((item) => (
          <div
            key={item.id}
            className={`flashcards-container__card ${getCardClass(item.id)}`}
            onClick={() => !submitted && setChosenId(item.id)}
          >
            {item.originalText}
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={chosenId === null}
        >
          Submit
        </button>
      ) : (
        <button className="next-button" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
};

export default FlashCards;
