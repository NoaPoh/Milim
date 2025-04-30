import React from 'react';
import './CollectionDrawer.scss';
// import { categories } from '../Home/Home';

const CollectionDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  //   const categoriesToChoose = categories;
  return (
    <div className={`drawer-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div
        className={`drawer-content ${isOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="drawer-title">Choose a Collection</h3>
        <ul className="drawer-list">
          {/* {categoriesToChoose.map((category) => (
            <>
              <li key={category.name} className="drawer-item">
                <img
                  src={category.icon}
                  alt={category.name}
                  className="drawer-icon"
                />
                <span className="drawer-text">{category.name}</span>
              </li>
            </>
          ))} */}
          {/* <li className="drawer-item">Animals</li>
          <li className="drawer-item">Fruits</li>
          <li className="drawer-item">My Words</li> */}
        </ul>
      </div>
    </div>
  );
};

export default CollectionDrawer;
