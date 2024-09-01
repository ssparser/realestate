import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'fixed',
  zIndex: 1000,
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

function BottomNavbar({name, onClick})
{
  return (
    <React.Fragment>
      <CssBaseline />
      <StyledFab color="secondary" aria-label="add" onClick={onClick}>
        <AddIcon />
      </StyledFab>
    </React.Fragment>
  );
    
}

export default BottomNavbar;