import React from 'react';
import './AnimalIcon.scss';

interface Props {
  path: string;
  accessories?: Accessory[];
  iconWidth: number;
}

interface Accessory {
  style: React.CSSProperties;
  name: string;
}

const AnimalIcon = ({ path, iconWidth }: Props) => {
  return (
    <img
      src={`src/assets/images/animals/${path}`}
      className={`animal rounded-full`}
      style={{ width: `${iconWidth}px` }}
      alt="אין תמונה"
    />
  );
};

export default AnimalIcon;
