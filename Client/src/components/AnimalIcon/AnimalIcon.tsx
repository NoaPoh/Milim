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

const AnimalIcon: React.FC = ({path, iconWidth}: Props) => {

  return (
    <img
      src={path || './assets/images/giraffe.png'}
      className={`animal rounded-full`} style={{ width: `${iconWidth}px` }}
     alt="missing your photo!"/>
  )
}

export default AnimalIcon;