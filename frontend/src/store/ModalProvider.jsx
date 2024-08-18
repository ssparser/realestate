// ModalContext.js
import React, { createContext, useState, useContext } from 'react';
import AddCardModal from '../modals/AddCardModal';
import AddDetailsModal from '../modals/AddDetailsModal';

// Create Context
const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);

  const showModal = (type) => setModalType(type);
  const hideModal = () => setModalType(null);

  return (
    <ModalContext.Provider value={{ modalType, showModal, hideModal }}>
      {children}
      {modalType === 'addCard' && <AddCardModal />}
      {modalType === 'addDetails' && <AddDetailsModal />}
    </ModalContext.Provider>
  );
};

// Custom hook for using modal context
export const useModal = () => useContext(ModalContext);
