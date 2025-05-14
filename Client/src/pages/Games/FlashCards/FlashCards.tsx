import React, { useEffect, useState } from 'react';
import './FlashCards.scss';
import { api } from '../../../utils/trpcClient';

const FlashCards = () => {
  const { data: words } = api.word.fetchRandomUserWords.useQuery({
    amount: 4,
  });
  console.log(words);
  const [correctId, setCorrectId] = useState<number>(0);
  const [chosenId, setChosenId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    const correctLogic = Math.floor(Math.random() * 4) + 1;
    setCorrectId(correctLogic);
    // correctWord = words?.find((word) => word.id === correctLogic);
  }, []);
  // const answers = [
  //   { id: 1, answer: 'Answer 1' },
  //   { id: 2, answer: 'Answer 2' },
  //   { id: 3, answer: 'Answer 3' },
  //   { id: 4, answer: 'Answer 4' },
  // ];

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

  return (
    <>
      <div className="flashcards-page">
        <img
          src={words?.[1].picture}
          alt="chair"
          className="flashcards-page__image"
        />
        <div className="flashcards-container">
          {words?.map((item) => (
            <div
              key={item.id}
              className={`flashcards-container__card ${getCardClass(item.id)}`}
              onClick={() => !submitted && setChosenId(item.id)}
            >
              {item.text}
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
