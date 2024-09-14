import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";

function Customtypography({name, fontWeight, letterSpacing = 0,  variant, ml = 0, mr = 0, wordSpacing})
{
    return (
        <Typography
              variant={variant}
              noWrap={false}
              sx={{
                display: 'flex',
                fontFamily: "monospace",
                fontWeight: fontWeight,
                letterSpacing: letterSpacing,
                color: "rgb(66,137,52)",
                textDecoration: "none",
                ml : ml,
                mr : mr,
                wordSpacing: wordSpacing,
              }}
            >
              {name}
            </Typography>
        )
}

export default Customtypography;