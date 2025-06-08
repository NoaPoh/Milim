import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import './CameraFeed.scss';

type CameraFeedProps = {
  onTakePicture: () => void;
  toggleCameraFacingMode: () => void;
  cantUseCamera: boolean;
};

const CameraFeed = forwardRef<HTMLVideoElement, CameraFeedProps>(
  (props, ref) => {
    return (
      <div className="CameraFeed">
        <video ref={ref} autoPlay muted className="CameraFeed__video-preview" />
        <div className="">
          <button
            className="button"
            disabled={props.cantUseCamera}
            onClick={props.onTakePicture}
          >
            <FontAwesomeIcon icon={faCamera} className="icon" />
          </button>
          <button className="button" onClick={props.toggleCameraFacingMode}>
            <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
          </button>
        </div>
      </div>
    );
  }
);

export default CameraFeed;
