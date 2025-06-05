import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesValues } from '../../../routes/routes';
import './CategoryCard.scss';

export type CategoryCardProps = {
  id: number;
  name: string;
  picture: string;
};

export const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Link
      to={`${RoutesValues.CATEGORY}/${props.id}`}
      className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl shadow-md hover:shadow-lg transition h-40"
    >
      <img
        src={props.picture}
        alt={props.name}
        className="w-19 h-19 category-icon"
      />
      <span className="mt-2 text-lg font-semibold text-gray-700">
        {props.name}
      </span>
    </Link>
  );
};
