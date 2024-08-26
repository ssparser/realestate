import { BottomNavigation, Box, Button, Toolbar } from "@mui/material";
import Custombutton from "../Custombutton";

function BottomNavbar({name, onClick})
{
    return (
        <BottomNavigation>
            <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "flex-end" }}>
              <Button onClick={onClick} name={name}>+</Button>

            </Box>
          </BottomNavigation>
      );
}

export default BottomNavbar;