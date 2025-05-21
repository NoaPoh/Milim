import React, { useEffect, useState } from 'react';
import './Loader.scss';

const randomChar = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return chars[Math.floor(Math.random() * chars.length)];
};

const generateLetters = (count: number) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  // Shuffle the array
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  // Take only as many letters as needed (max 26)
  const selected = chars.slice(0, Math.min(count, chars.length));

  return selected.map((char, i) => ({
    id: `${i}-${char}`,
    char,
    top: `${30 + Math.random() * 30}%`,
    left: `${8 + Math.random() * 84}%`,
    size: `${0.5 + Math.random() * 3}rem`,
    delay: `${Math.random() * 4}s`,
  }));
};

const Loader = () => {
  const [letters, setLetters] = useState(generateLetters(12));

  useEffect(() => {
    const interval = setInterval(() => {
      setLetters(generateLetters(12));
    }, 12000); // every 12 s instead of 9
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Fredoka&display=swap"
        rel="stylesheet"
      />

      {letters.map((letter) => (
        <span
          key={letter.id}
          className="floating-letter"
          style={{
            top: letter.top,
            left: letter.left,
            fontSize: letter.size,
            animationDelay: letter.delay,
          }}
        >
          {letter.char}
        </span>
      ))}
    </div>
  );
};

export default Loader;
