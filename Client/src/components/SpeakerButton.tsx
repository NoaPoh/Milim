import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface props {
  text: string;
}

const SpeakerButton = ({ text }: props) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button onClick={() => speak(text)}>
      <FontAwesomeIcon icon={faVolumeUp} />
    </button>
  );
};

export default SpeakerButton;
