import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface props {
  text: string;
  language: 'en-US' | 'he-IL';
}

const SpeakerButton = ({ text, language }: props) => {
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    utterance.rate = 1;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <button className="speaker-button" onClick={() => speak(text)}>
      <FontAwesomeIcon icon={faVolumeUp} />
    </button>
  );
};

export default SpeakerButton;
