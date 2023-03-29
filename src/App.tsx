import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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
import { CardActionArea, Chip } from '@mui/material';

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
  { title: 'Solar System', description: 'A far view from the planets, excluding the near details.', to: '/cg/solar-system', img: 'https://source.unsplash.com/random', tags: [] },
  { title: 'Planets', description: 'A more detailed view from a single planet, including day/night cycles.', to: '/cg/solar-system', img: 'https://source.unsplash.com/random', tags: [] },
  { title: 'Atmospheric scattering', description: 'Earth atmosphere scatters the incoming sunlight. ', to: '/cg/solar-system', img: 'https://source.unsplash.com/random', tags: ["in progress", "big"] },
];

const theme = createTheme({
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
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{ mt: 2 }} maxWidth="md">
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              Tom's Playground
            </Typography>
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
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}