import React from 'react';
import './FlashCards.scss';

const FlashCards = () => {
  const answers = [
    { id: 1, answer: 'Answer 1' },
    { id: 2, answer: 'Answer 2' },
    { id: 3, answer: 'Answer 3' },
    { id: 4, answer: 'Answer 4' },
  ];
  return (
    <>
      <img src="rrtrtrtr" alt="chair" className="w-19 h-19 category-icon" />
      <div className="flashcards-container">
        {answers.map((item) => (
          <div key={item.id} className="flashcards-container__card">
            {item.answer}
          </div>
        ))}
      </div>
    </>
  );
};

export default FlashCards;
