import React, { useEffect, useState } from 'react';
import './FlashCards.scss';
import { api } from '../../../utils/trpcClient';

const FlashCards = () => {
  const { data: words } = api.word.fetchRandomUserWords.useQuery({
    amount: 4,
  });
  console.log(words);
  const [correctId, setCorrectId] = useState<number>(-1);
  const [chosenId, setChosenId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    if (words && words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const correctWord = words[randomIndex];
      setCorrectId(correctWord.id);
      // setCorrectId(words[randomIndex].id);
    }
  }, [words]);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const getCardClass = (id: number) => {
    if (!submitted) {
      return id === chosenId ? 'chosen' : '';
    }
    if (id === correctId) return 'correct';
    if (id === chosenId && id !== correctId) return 'wrong';
    return '';
  };

  const correctSrc = words?.find((word) => word.id === correctId)?.picture;

  return (
    <>
      <div className="flashcards-page">
        <img src={correctSrc} className="flashcards-page__image" />
        <div className="flashcards-container">
          {words?.map((item) => (
            <div
              key={item.id}
              className={`flashcards-container__card ${getCardClass(item.id)}`}
              onClick={() => !submitted && setChosenId(item.id)}
            >
              {item.originalText}
            </div>
          ))}
        </div>

        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={chosenId === null}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default FlashCards;
