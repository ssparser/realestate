import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';

export default function Header() {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
       
        zIndex: theme.zIndex.appBar + 1,
       
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
       
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {/* You can add your header content here */}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};