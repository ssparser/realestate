import React, { useCallback, useState } from "react";
import {
  Dialog,
  DialogTitle,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { useModal } from "../store/ModalProvider";
import { createPortal } from "react-dom";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Snackbar } from "@mui/material";
import Alert from '@mui/material/Alert';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import axios from "axios";



function SharePropertyModal({propertyName}) {
  const { hideModal } = useModal();
  const today = new Date()
  const [dateRange, setDateRange] = useState([
    {
      startDate: today,
      endDate: addDays(today, 7),
      key: "selection",
    },
  ]);
  const [shareLink, setShareLink] = useState(null);
  const [open, setOpen] = useState(false);


  const generateShareLink = useCallback(async (event) => {
    event.stopPropagation(); 
    try {
      const endDate = dateRange[0].endDate;      
      const endDateEpochInSeconds = Math.floor(endDate.getTime() / 1000);
            
      const response = await axios.post(`http://localhost:8080/api/share/generate?TTL=${endDateEpochInSeconds}&folderName=${propertyName}`);
      const token = response.data;
      setShareLink(`http://localhost:5173/shared/${token}`);
      
    } catch (error) {
      console.error('Failed to generate share link', error);
    }
  }, [dateRange]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return createPortal(
    <Dialog open={true} onClose={hideModal} maxWidth="md">
      <DialogTitle>Share {propertyName.slice(0, -1)} Details With Customer</DialogTitle>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => {const newRange = {
      ...item.selection,
      startDate: today  
    };
    setDateRange([newRange]);}}
        moveRangeOnFirstSelection={false}
        ranges={dateRange}
        direction="horizontal"
        months={2}
        minDate={new Date()}
      />
       <Button
          variant="contained"
          color="primary"
          onClick={generateShareLink}
          sx={{ mt: 1 }}
        >
         Get Link
        </Button>
        {shareLink && (
          <Box display="flex" justifyContent="center" width="100%" marginBlock='1rem'>
            <Box
              
              justifyContent="center"
              alignItems="center"
              p={1}
              bgcolor={(theme) => theme.palette.grey[200]}
              borderRadius={20}
              sx={{
                cursor: 'pointer'
              }}
              onClick={() => { const textToCopy = JSON.stringify(shareLink);
                navigator.clipboard.writeText(textToCopy.substring(1, textToCopy.length-1))
                setOpen(true);

              }}
            >
              <Typography
                variant="body2"
                component="p"
                sx={{
                  padding: '0 8px',
                }}
                alignItems='center'
                display="inline-flex"
                gap={2}
              >
                {shareLink} <ContentCopyIcon fontSize="x-small" />
              </Typography>
              <Snackbar open={open} autoHideDuration={1000}  onClose={handleClose}>
                <Alert
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Link Copied To clipboard Successfully
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        )}
    </Dialog>
    ,
    document.getElementById("modal")
  );
}

export default SharePropertyModal;
