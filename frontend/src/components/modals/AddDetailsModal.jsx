import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useModal } from '../../store/ModalProvider';
import { createPortal } from "react-dom";


const AddDetailsModal = () => {
  const { hideModal } = useModal();

  const handleAddDetails = () => {
    // Add your logic to handle adding details here
    hideModal();
  };

  return (
    createPortal(
    <Dialog open={true} onClose={hideModal}>
      <DialogTitle>Add Details</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Detail Title" fullWidth />
        <TextField margin="dense" label="Detail Description" fullWidth />
        {/* Add more fields as needed */}
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal}>Cancel</Button>
        <Button onClick={handleAddDetails}>Add Details</Button>
      </DialogActions>
    </Dialog>,document.getElementById('modal')
        )
  );
};

export default AddDetailsModal;