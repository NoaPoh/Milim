import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesValues } from '../../../routes/routes';

export type CategoryCardProps = {
  name: string;
  picture: string;
};

export const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Link
      to={`${RoutesValues.CATEGORIES}/${props.name}`}
      className="flex flex-col items-center justify-center p-2 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
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
