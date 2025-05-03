import React from 'react';
import './AnimalIcon.scss';

interface Props {
  path: string;
  accessories?: Accessory[];
}

interface Accessory {
  style: React.CSSProperties;
  name: string;
}

const AnimalIcon: React.FC = ({path}: props) => {

  return (
    <img
      src={path || '/assets/images/giraffe.svg'}
      className="w-32 h-32 rounded-full"
     alt="missing your photo!"/>
  )
}

export default AnimalIcon;