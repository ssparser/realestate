import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Customtypography from "../Customtypography";
import Custombutton from "../Custombutton";

function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: "rgb(255, 255, 255)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)"
      }}
    >
      <Toolbar disableGutters>
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flexstart" }}>
          <Custombutton name="Propertify" />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
