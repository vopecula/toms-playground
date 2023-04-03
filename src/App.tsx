import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { dark, light } from './theme';

export function App() {
  // const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isSystemDarkMode = true
  const [darkMode, setDarkMode] = useState(isSystemDarkMode)

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <Box sx={{
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        background: darkMode ? 'radial-gradient(transparent 0%, rgb(0,0,0,.9) 130%)' : 'radial-gradient(rgb(0,0,0,.1), rgb(0,0,0,.3))',
        zIndex: -1
      }} />
      <CssBaseline />
        <Container sx={{ mt: 2 }} maxWidth="md">
          <AppBar position="relative" sx={{ background: 'url(/SMqDLUk.png)' }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }} noWrap>
                Tommy's Playground
              </Typography>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => setDarkMode(!darkMode)}
                color="inherit"
              >
                {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Toolbar>
          </AppBar>
        </Container>

        <Outlet />
    </ThemeProvider>
  );
}

export default App