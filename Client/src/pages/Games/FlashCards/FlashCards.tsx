import React, { useState } from 'react';
import './FlashCards.scss';

const FlashCards = () => {
  const answers = [
    { id: 1, answer: 'Answer 1' },
    { id: 2, answer: 'Answer 2' },
    { id: 3, answer: 'Answer 3' },
    { id: 4, answer: 'Answer 4' },
  ];

  const correctId = 3; // set the correct answer here
  const [chosenId, setChosenId] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

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
          src="https://picsum.photos/200/300"
          alt="chair"
          className="w-19 h-19 category-icon"
        />
        <div className="flashcards-container">
          {answers.map((item) => (
            <div
              key={item.id}
              className={`flashcards-container__card ${getCardClass(item.id)}`}
              onClick={() => !submitted && setChosenId(item.id)}
            >
              {item.answer}
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
