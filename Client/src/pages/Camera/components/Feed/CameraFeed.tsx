import { forwardRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

type CameraFeedProps = {
  onTakePicture: () => void;
  toggleCameraFacingMode: () => void;
  cantUseCamera: boolean;
};

const CameraFeed = forwardRef<HTMLVideoElement, CameraFeedProps>(
  (props, ref) => {
    return (
      <>
        <div className="CameraPage__top">
          <video
            ref={ref}
            autoPlay
            muted
            className="CameraFeed__video-preview"
          />
        </div>
        <div className="CameraPage__bottom">
          <p className="desc">נסו להשאר יציבים עם המצלמה!</p>
          <div className="feed-actions">
            <button
              className="btn"
              disabled={props.cantUseCamera}
              onClick={props.onTakePicture}
            >
              <FontAwesomeIcon icon={faCamera} className="icon" />
            </button>
            <button className="btn" onClick={props.toggleCameraFacingMode}>
              <FontAwesomeIcon icon={faArrowsRotate} className="icon" />
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default CameraFeed;
