import React, { useState } from 'react';

const CollectionDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${
        isOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg z-50 p-6 transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        onClick={(e) => e.stopPropagation()} // prevents close on inner click
      >
        <h3 className="text-xl font-semibold mb-4">Choose a Collection</h3>
        <ul className="space-y-2">
          <li className="p-3 bg-gray-100 rounded-md cursor-pointer">Animals</li>
          <li className="p-3 bg-gray-100 rounded-md cursor-pointer">Fruits</li>
          <li className="p-3 bg-gray-100 rounded-md cursor-pointer">
            My Words
          </li>
          {/* ...more collections */}
        </ul>
      </div>
    </div>
  );
};

export default CollectionDrawer;
