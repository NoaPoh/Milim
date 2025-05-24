import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Category.scss';
import { useGetUserCategory } from './hooks/useGetUserCategory';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RoutesValues } from '../../routes/routes';
import addIcon from '../../assets/images/categories/add.png';
import WordCard from './components/WordCard/WordCard';

export type CategoryProps = {
  name: string;
};

export default function Category() {
  const { id } = useParams(); // Extract the dynamic category ID
  const navigate = useNavigate();

  const { category } = useGetUserCategory(Number(id) || 0);

  const navToHome = () => {
    navigate(RoutesValues.HOME);
  };

  return (
    category && (
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
                categoryId={word.categoryId}
                originalText={word.originalText}
                picture={word.picture}
                translatedText={word.translatedText}
                wordId={word.id}
                key={word.id}
              />
            ))}
          <div key={0} className="category__add-word">
            <Link to={RoutesValues.CAMERA}>
              <img
                src={addIcon}
                alt="Add new word"
                className="add-icon object-cover"
              />
            </Link>
          </div>
        </div>
      </div>
    )
  );
}
