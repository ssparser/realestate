import React, { createContext, useState, useContext, lazy, Suspense, useCallback } from 'react';
import AddPropertyItemModal from '../modals/AddPropertyItemsModal';
import AddPropertyModal from '../modals/AddPropertyModal';
import SharePropertyModal from '../modals/SharePropertyModal';

import CircularProgress from '@mui/material/CircularProgress';

// Create Context
const ModalContext = createContext();

// Create a provider component
export const ModalProvider = ({ children }) => {
  const [modalType, setModalType] = useState(null);
  const [modalState, setModalState] = useState({ type: null, props: {} });

  const showModal = useCallback((type, props = {}) => {
    setModalState({ type, props });
  }, []);

  const hideModal = useCallback(() => {
    setModalState({ type: null, props: {} });
  }, []);

  return (
    <ModalContext.Provider value={{ modalType, showModal, hideModal }}>
      {children}
      <Suspense fallback={<CircularProgress />}>
      {modalState.type === 'addProperty' && <AddPropertyModal {...modalState.props} />}
      {modalState.type === 'AddPropertyItem' && <AddPropertyItemModal {...modalState.props} />}
      {modalState.type === 'SharePropertyModal' && <SharePropertyModal {...modalState.props} />}
      </Suspense>
    </ModalContext.Provider>
  );
};

// Custom hook for using modal context
export const useModal = () => useContext(ModalContext);
