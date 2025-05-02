import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

type CameraFeedProps = {
  onTakePicture: () => void;
  cantUseCamera: boolean;
};

const CameraFeed = forwardRef<HTMLVideoElement, CameraFeedProps>(
  ({ onTakePicture, cantUseCamera }, ref) => {
    return (
      <>
        <video ref={ref} autoPlay muted className="video-preview" />
        <button
          className="button"
          disabled={cantUseCamera}
          onClick={onTakePicture}
        >
          <FontAwesomeIcon icon={faCamera} className="icon" />
        </button>
      </>
    );
  }
);

export default CameraFeed;
