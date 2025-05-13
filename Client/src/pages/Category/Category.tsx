import React from 'react';
import '@tensorflow/tfjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import './Category.scss';
import { useGetUserCategory } from './hooks/useGetUserCategory';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { RoutesValues } from '../../routes/routes';
import addIcon from '../../assets/images/categories/add.png';

export type CategoryProps = {
  name: string;
};

export default function Category({ name }: CategoryProps) {
  const { id } = useParams(); // Extract the dynamic category ID
  const navigate = useNavigate();

  const { category, isLoading } = useGetUserCategory(+id || 0);

  const navToHome = () => {
    navigate(RoutesValues.HOME);
  };

  return (category && (
    <div className="category">
      <FontAwesomeIcon onClick={navToHome} icon={faChevronLeft} className="return__icon text-2xl text-gray-700" />{' '}
      <p className="category__title">{category.name}</p>
      <div className="category__words">
        {category.words && category.words.map((word) => (
          <div key={word.id} className="category__word">
            <Link to={`${RoutesValues.CATEGORY}/${category.id}/${word.id}`}>
              <img
                src={word.picture}
                alt={word.text}
                className="object-cover"
              />
            </Link>
          </div>
        ))}
        <div key={0} className="category__word">
          <Link to={RoutesValues.CAMERA}>
            <img
              src={addIcon}
              alt="Add new word"
              className="add-icon object-cover mb-2"
            />
          </Link>
        </div>
      </div>
    </div>
  ));
}
