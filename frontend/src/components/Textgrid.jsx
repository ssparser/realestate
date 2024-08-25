import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Customtypography from "./Customtypography";
import { Typography } from "@mui/material";

function Textgrid() {
  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      sx={{ maxWidth: "1000px", width: "100%", mt: 4 }}
    >
      <Grid item xs="auto">
        <Box
          sx={{
            width: "100%",
            mb: 3,
            backgroundImage: "linear-gradient(180deg, #fff06b, #fff06b)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "15px bottom",
            backgroundSize: "100% 40px",
            textDecoration: "none",
          }}
        >
          <Customtypography variant="h3" name="Get Inspired" fontWeight="700" letterSpacing="-0.05rem" wordSpacing="-0.6rem" />
        </Box>
      </Grid>
      <Grid item xs="auto">
        <Box sx={{ width: "80%", pl:"7px" }}>
          <Customtypography
            variant="body1"
            name="Browsing for the next long haul trip?, everyday journey, or just fancy at what's new? From comunnity favorites to about-to-sell-out items see all here.
"    wordSpacing="-0.15rem"

          />
        </Box>
      </Grid>
    </Grid>
  );
}
export default Textgrid;