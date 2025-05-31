import React from 'react';
import './AnimalIcon.scss';

interface Props {
  path: string;
  accessories?: Accessory[];
  iconWidth: number;
}

export const FrameToStyle = new Map<string, string>([
  ['dotted frame', '1px black dotted'],
  ['dashed frame', '2px red dashed'],
  ['solid frame', '2px black solid'],
]);
interface Accessory {
  style: React.CSSProperties;
  name: string;
  background: string;
  frame: string;
}

const AnimalIcon = ({ path, iconWidth, background, frame }: Props) => {
  return (
    <img
      src={`src/assets/images/animals/${path}`}
      className={`animal rounded-full`}
      style={{ width: `${iconWidth}px`, backgroundColor: background, border: `${FrameToStyle.get(frame)}` }}
      alt="missing your photo!"
    />
  );
};

export default AnimalIcon;
