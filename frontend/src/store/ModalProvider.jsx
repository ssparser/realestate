import React, { createContext, useState, useContext } from 'react';
import AddPropertyItemModal from '../modals/AddPropertyItemsModal';
import AddPropertyModal from '../modals/AddPropertyModal';

// Create Context
const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [modalState, setModalState] = useState({ type: null, props: {} });

  const showModal = (type, props = {}) => setModalState({ type, props });
  const hideModal = () => setModalState({ type: null, props: {} });

  return (
    <ModalContext.Provider value={{ modalType, showModal, hideModal }}>
      {children}
      {modalState.type === 'addProperty' && <AddPropertyModal {...modalState.props} />}
      {modalState.type === 'AddPropertyItem' && <AddPropertyItemModal {...modalState.props} />}
    </ModalContext.Provider>
  );
};

// Custom hook for using modal context
export const useModal = () => useContext(ModalContext);
