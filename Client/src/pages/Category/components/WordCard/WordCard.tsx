import { Skeleton } from '@mui/material';
import './WordCard.scss';

export interface WordCardProps {
  originalText: string;
  picture: string;
  onClick?: () => void;
}

export default function WordCard(props: WordCardProps) {
  return (
    <div className="WordCard__container" onClick={() => props.onClick?.()}>
      {props.picture === 'loading' ? (
        <Skeleton variant="rectangular" width={100} height={100} />
      ) : (
        <img
          src={props.picture}
          alt={props.originalText}
          className="object-cover"
        />
      )}
      <p>{props.originalText}</p>
    </div>
  );
}
