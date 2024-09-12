import React, { useState } from "react";
import dayjs from "dayjs";
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
import { useModal } from "../store/ModalProvider";
import { createPortal } from "react-dom";
import { addDays } from "date-fns";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function SharePropertyModal() {
  const { hideModal } = useModal();
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  return createPortal(
    <Dialog open={true} onClose={hideModal} maxWidth="md">
      <DialogTitle>Share mg Details With Customer</DialogTitle>
      <DateRange
        editableDateInputs={true}
        onChange={(item) => setState([item.selection])}
        moveRangeOnFirstSelection={false}
        ranges={state}
        direction="horizontal"
        months={2}
        minDate={new Date()}
      />
    </Dialog>,
    document.getElementById("modal")
  );
}

export default SharePropertyModal;
