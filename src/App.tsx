import AppBar from '@mui/material/AppBar';
import { deepmerge } from '@mui/utils';
import Button from '@mui/material/Button';
import AlbumIcon from '@mui/icons-material/Album';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CardActionArea, Chip, IconButton } from '@mui/material';
import { useState } from 'react';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        vopecula.gihub.com/toms-playground
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const topics = [
  { title: 'Solar System', description: 'A far view from the planets, excluding the near details.', to: '/cg/solar-system', img: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Solar_system_orrery_inner_planets.gif', tags: [] },
  { title: 'Planets', description: 'A more detailed view from a single planet, including day/night cycles.', to: '/cg/planets', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Terrestrial_planet_sizes2.jpg/2560px-Terrestrial_planet_sizes2.jpg', tags: [] },
  { title: 'Atmospheric scattering', description: 'Earth atmosphere scatters the incoming sunlight. ', to: '/cg/atmospheric-scattering', img: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Pinatubo_dust_layer.jpg', tags: ["planned", "complex"] },
  { title: 'Flow fields', description: 'A vector field for generative arts.', to: '/cg/flow-field', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/VectorField.svg/1280px-VectorField.svg.png', tags: ["planned", "shader"] },
  { title: 'Voronoi', description: 'Voronoi texture generation.', to: '/cg/voronoi', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Euclidean_Voronoi_diagram.svg/1280px-Euclidean_Voronoi_diagram.svg.png', tags: ["planned", "shader"] },
];

const common = {
  palette: {
    primary: {
      main: '#009bd7'
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
};

const dark = createTheme(deepmerge(common, {
  palette: {
    mode: 'dark',
  }
}));
const light = createTheme(common);

export function App() {
  const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const [darkMode, setDarkMode] = useState(isSystemDarkMode)

  return (
    <ThemeProvider theme={darkMode ? dark : light}>
      <CssBaseline />
      <Container sx={{ mt: 2 }} maxWidth="md">
        <AppBar position="relative">
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
            <AlbumIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" sx={{ flexGrow: 1 }} noWrap>
              Tom's Playground
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
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Adventures in CG
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              These projects are based on ThreeJS. The topics are very mixed, I just tried out the most intestings topics.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {topics.map((topic) => (
              <Grid item key={topic.to} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%' }}                >
                  <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 150,
                      }}
                      image={topic.img}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {topic.title}
                      </Typography>
                      <Typography>
                        {topic.description}
                      </Typography>
                      {topic.tags.map(tag => <Chip key={tag} size="small" sx={{ mr: 1, mt: 1 }} label={tag} />)}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          End of the line
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Yup, it is the bottom of the page, nothing to see here.
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}

export default App