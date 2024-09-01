import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useModal } from "../store/ModalProvider";
import { createPortal } from "react-dom";
import useUpload from "../customHooks/useUpload";

const AddPropertyModal = () => {
  const { hideModal } = useModal();
  const { uploadFiles, response, error, loading } = useUpload();

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [propertyName, setPropertyName] = useState("");

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (image && propertyName) {
      uploadFiles([image], propertyName, "");
    }
  };

  return createPortal(
    <Dialog open={true} onClose={hideModal}>
      <DialogTitle>Add Property Details</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Property Name"
          fullWidth
          value={propertyName}
          onChange={(e) => setPropertyName(e.target.value)}
        />

        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-image"
          type="file"
          onChange={handleImageChange}
        />
        <label htmlFor="upload-image">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {imagePreview && (
          <div style={{ marginTop: 16 }}>
            <Typography variant="body1">Image Preview:</Typography>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "100%",
                maxHeight: 200,
                objectFit: "contain",
                marginTop: 8,
              }}
            />
          </div>
        )}
        {error && <Typography color="error">{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={hideModal}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Uploading..." : "Add Details"}
        </Button>
      </DialogActions>
    </Dialog>,
    document.getElementById("modal")
  );
};

export default AddPropertyModal;