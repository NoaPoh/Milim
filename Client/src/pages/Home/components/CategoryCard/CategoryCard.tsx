import { Link } from 'react-router-dom';
import { RoutesValues } from '../../../../routes/routes';
import './CategoryCard.scss';
import { Skeleton } from '@mui/material';

export type CategoryCardProps = {
  id: number;
  name: string;
  picture: string | 'loading';
};

export const CategoryCard = (props: CategoryCardProps) => {
  return (
    <Link to={`${RoutesValues.CATEGORY}/${props.id}`} className="CategoryCard">
      {props.picture === 'loading' ? (
        <Skeleton variant="rectangular" width={100} height={100} />
      ) : (
        <img
          src={
            props.picture ||
            'https://cdn-icons-png.flaticon.com/512/1375/1375106.png'
          }
          alt={props.name}
          className="category-icon"
        />
      )}
      <span className="mt-2 text-lg font-semibold text-gray-700">
        {props.name}
      </span>
    </Link>
  );
};
