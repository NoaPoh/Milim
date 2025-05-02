import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../../../components/Loader/Loader';
import SpeakerButton from '../../../../components/SpeakerButton';
import CollectionDrawer from '../CollectionDrawer/CollectionDrawer';
import { useState } from 'react';

type PicturePreviewProps = {
  image: string;
  onRestart: () => void;
  detectedObject: string | undefined;
  isDetecting: boolean;
};

export default function PicturePreview({
  image,
  onRestart,
  detectedObject,
  isDetecting,
}: PicturePreviewProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <img src={image} alt="Captured" className="captured-photo" />
      <button className="button" onClick={onRestart}>
        <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
      </button>

      {isDetecting && <Loader />}
      {!isDetecting && detectedObject && (
        <div className="predictions-container">
          <p className="prediction-item">{detectedObject}</p>
          <SpeakerButton text={detectedObject} />
          <button className="btn" onClick={openDrawer}>
            Add To Collection
          </button>
        </div>
      )}

      <CollectionDrawer
        isOpen={drawerOpen}
        onClose={closeDrawer}
        newWord={detectedObject || ''}
        picture={image}
      />
    </>
  );
}
