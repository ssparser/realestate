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

const AddPropertyItemsModal = ({propertyName}) => {
  const { hideModal } = useModal();
  const { uploadFiles, error, loading } = useUpload();
  const [propertyElementName, setPropertyElementName] = useState("");
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [beforeImagePreview, setBeforeImagePreview] = useState("");
  const [afterImagePreview, setAfterImagePreview] = useState("");

  function handleImageChange(event, type) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "beforeImage") {
          setBeforeImage(file);
          setBeforeImagePreview(reader.result);
        } else if (type === "afterImage") {
          setAfterImage(file);
          setAfterImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  const handleSubmit = () => {
    if (beforeImage && afterImage && propertyElementName) {
      console.log(propertyName);
      uploadFiles([beforeImage, afterImage],propertyName, propertyElementName);
    }
  };

  return createPortal(
    <Dialog open={true} onClose={hideModal}>
      <DialogTitle>Property Elements</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Property Element Name"
          fullWidth
          value={propertyElementName}
          onChange={(e) => setPropertyElementName(e.target.value)}
        />

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-before-image"
          type="file"
          onChange={(event) => handleImageChange(event, "beforeImage")}
        />
        <label htmlFor="upload-before-image">
          <IconButton color="primary" aria-label="upload before picture" component="span">
            <PhotoCamera />
            <Typography variant="caption" style={{ marginLeft: 8 }}>Before Image</Typography>
          </IconButton>
        </label>

        <input
          accept="image/*"
          style={{ display: "none" }}
          id="upload-after-image"
          type="file"
          onChange={(event) => handleImageChange(event, "afterImage")}
        />
        <label htmlFor="upload-after-image">
          <IconButton color="primary" aria-label="upload after picture" component="span">
            <PhotoCamera />
            <Typography variant="caption" style={{ marginLeft: 8 }}>After Image</Typography>
          </IconButton>
        </label>

        {(beforeImagePreview || afterImagePreview) && (
          <div style={{ marginTop: 16 }}>
            <Typography variant="body1">Image Preview:</Typography>
            {beforeImagePreview && (
              <img
                src={beforeImagePreview}
                alt="Before Preview"
                style={{
                  width: "50%",
                  maxHeight: 200,
                  objectFit: "contain",
                  marginTop: 8,
                }}
              />
            )}
            {afterImagePreview && (
              <img
                src={afterImagePreview}
                alt="After Preview"
                style={{
                  width: "50%",
                  maxHeight: 200,
                  objectFit: "contain",
                  marginTop: 8,
                }}
              />
            )}
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

export default AddPropertyItemsModal;