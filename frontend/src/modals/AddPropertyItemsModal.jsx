import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useModal } from "../store/ModalProvider";
import { createPortal } from "react-dom";


const AddPropertyItemsModal = () => {
  const { hideModal } = useModal();

  const handleAddCard = () => {
    hideModal();
  };

  return (
    createPortal(
    <Dialog open={true} onClose={hideModal}>
      <DialogTitle>Add New Card</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Title" fullWidth />
        <TextField margin="dense" label="Description" fullWidth />
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal}>Cancel</Button>
        <Button onClick={handleAddCard}>Add Card</Button>
      </DialogActions>
    </Dialog>,document.getElementById('modal')
        )
  );
};
export default AddPropertyItemsModal;