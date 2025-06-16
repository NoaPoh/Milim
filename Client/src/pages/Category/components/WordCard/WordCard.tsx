import './WordCard.scss';

export interface WordCardProps {
  originalText: string;
  picture: string;
  onClick?: () => void;
}

export default function WordCard(props: WordCardProps) {
  return (
    <div className="WordCard__container" onClick={() => props.onClick?.()}>
      <img
        src={props.picture}
        alt={props.originalText}
        className="object-cover"
      />
      <p>{props.originalText}</p>
    </div>
  );
}
