import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import SpeakerButton from '../../../../components/SpeakerButton';
import CollectionDrawer from '../CollectionDrawer/CollectionDrawer';
import { useState } from 'react';
import './PicturePreview.scss';

type PicturePreviewProps = {
  image: string;
  onRestart: () => void;
  detectedObject: string | undefined;
  isDetecting: boolean;
  translatedWord: string | undefined;
};

export default function PicturePreview({
  image,
  onRestart,
  detectedObject,
  isDetecting,
  translatedWord,
}: PicturePreviewProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <img src={image} alt="Captured" className="captured-photo" />
      <button className="retake button" onClick={onRestart}>
        <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
      </button>

      {!isDetecting && detectedObject && (
        <div className="predictions-container">
          <div className="translation">
            <p className="prediction-item">{detectedObject}</p>
            <SpeakerButton text={detectedObject} language="en-US" />
            {translatedWord && (
              <>
                <p className="prediction-item">{translatedWord}</p>
                <SpeakerButton text={translatedWord} language="he-IL" />
              </>
            )}
          </div>
          <button className="btn" onClick={openDrawer}>
            Add To Collection
          </button>
        </div>
      )}

      <CollectionDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        originalText={detectedObject || ''}
        translatedText={translatedWord || ''}
        picture={image}
      />
    </>
  );
}
