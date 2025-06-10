import React from 'react';
import './AnimalIcon.scss';

interface Props {
  path: string;
  iconWidth: number;
  background: string;
  frame: string;
}

export const FrameToStyle = new Map<string, string>([
  ['dotted frame', '5px black dotted'],
  ['red dashed frame', '5px red dashed'],
  ['aqua solid frame', '5px aqua solid'],
  ['dotted olive frame', '9px dotted darkolivegreen'],
]);

const AnimalIcon = ({ path, iconWidth, background, frame }: Props) => {
  return (
    <img
      src={`/images/animals/${path}.png`}
      className={`animal rounded-full`}
      alt="אין תמונה"
      style={{ width: `${iconWidth}px`, height: `${iconWidth}px`, backgroundColor: background, border: `${FrameToStyle.get(frame)}` }}
    />
  );
};

export default AnimalIcon;
