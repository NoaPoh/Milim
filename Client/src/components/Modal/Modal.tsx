import { PropsWithChildren } from 'react';
import './Modal.scss';

const Modal = (props: PropsWithChildren) => {
  return (
    <div className="modal">
      <div className="modal-content">{props.children}</div>
    </div>
  );
};
export default Modal;
