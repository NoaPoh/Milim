import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import SpeakerButton from '../../../../components/SpeakerButton';
import CollectionDrawer from '../CollectionDrawer/CollectionDrawer';
import { useState } from 'react';

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
      <>
        <div className="CameraPage__top">
          <img src={image} alt="Captured" />
        </div>
        <div className="CameraPage__bottom">
          <button className="retake btn" onClick={onRestart}>
            <FontAwesomeIcon icon={faPlay} className="icon" />
          </button>
          {!isDetecting && detectedObject && (
            <>
              <div className="flex-row">
                <p className="prediction-item">{detectedObject}</p>
                <SpeakerButton text={detectedObject} language="en-US" />
              </div>

              {translatedWord && (
                <div className="flex-row">
                  <p className="prediction-item">{translatedWord}</p>
                  <SpeakerButton text={translatedWord} language="he-IL" />
                </div>
              )}
              <button className="btn" onClick={openDrawer}>
                הוסף לאוסף
              </button>
            </>
          )}
        </div>
      </>

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
