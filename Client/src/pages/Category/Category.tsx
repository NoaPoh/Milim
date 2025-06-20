import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Category.scss';
import { useGetUserCategory } from './hooks/useGetUserCategory';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutesValues } from '../../routes/routes';
import WordCard from './components/WordCard/WordCard';
import { ClickedWord, WordModal } from './components/WordModal/WordModal';
import { useState } from 'react';
import { WordWithStringPic } from 'milim-server/types';

export default function Category() {
  const { id } = useParams(); // Extract the dynamic category ID
  const [openedWord, setOpenedWord] = useState<ClickedWord | null>(null);
  const navigate = useNavigate();

  const { data: category } = useGetUserCategory(Number(id) || 0);

  const navToHome = () => {
    navigate(RoutesValues.HOME);
  };

  const handleCardClick = (word: WordWithStringPic) => {
    setOpenedWord({
      wordId: word.id,
      originalText: word.originalText,
      translatedText: word.translatedText,
      picture: word.picture,
    });
  };

  if (!category) {
    return (
      <div className="category__loading">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="category">
        <div className="category__topbar">
          <FontAwesomeIcon
            onClick={navToHome}
            icon={faChevronLeft}
            className="category__topbar-icon return__icon text-2xl text-gray-700"
          />
          <p className="category__title">{category.name}</p>
        </div>

        <div className="category__words">
          {category.words &&
            category.words.map((word) => (
              <WordCard
                originalText={word.originalText}
                picture={word.picture}
                key={word.id}
                onClick={() => handleCardClick(word)}
              />
            ))}
        </div>
      </div>
      {openedWord && (
        <WordModal {...openedWord} closeModal={() => setOpenedWord(null)} />
      )}
    </>
  );
}
