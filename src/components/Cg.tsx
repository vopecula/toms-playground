import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { CardActionArea, Chip, Divider, Link } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const topics = [
  { title: 'Solar System', description: 'A far view from the planets, excluding the near details.', to: '/cg/preview/solar-system', img: '/img/solar_system.jpeg', tags: [] },
  { title: 'Planets', description: 'A more detailed view from a single planet, including day/night cycles.', to: '/cg/preview/planet', img: '/img/planets.jpeg', tags: [] },
  { title: 'Atmospheric scattering', description: 'Earth atmosphere scatters the incoming sunlight. ', to: '/cg/preview/planet', img: '/img/atmosphere.jpeg', tags: ["planned", "complex"] },
  { title: 'Flow fields', description: 'A vector field for generative arts.', to: '/cg/flow-field', img: '/img/vectorfield.png', tags: ["planned", "shader"] },
  { title: 'Voronoi', description: 'Voronoi texture generation.', to: '/cg/preview/voronoi', img: '/img/voronoi.png', tags: ["planned", "shader"] },
  { title: 'Skybox', description: 'A simple skybox environment texture animated with a flowmap..', to: '/cg/preview/skybox', img: '/img/equirectangular.jpeg', tags: ["shader"] },
  { title: 'Spotlight', description: 'Fake volumetric spotlights', to: '/cg/preview/fake-volumetric-spotlight', img: '/img/spotlight.jpeg', tags: ["planned", "shader"], links: [{ name: "Codesandbox topic", href: "https://codesandbox.io/s/tx1pq?file=/src/App.js:1493-1510" }, { name: "'Good Enough' Volumetrics for Spotlights", href: "http://john-chapman-graphics.blogspot.com/2013/01/good-enough-volumetrics-for-spotlights.html" }] },
  { title: 'Post-processing', description: 'What are shader passes? How can I use them?', to: '/cg/preview/post-processing', img: '/img/bloom.png', tags: ["shader"] },
  { title: 'Budget diff', description: 'Spot unregistered expenses inbetween apps.', to: '/budget', img: '/img/budget.jpeg', tags: ["budget"] },
  { title: 'Depth buffer', description: 'Visualizing the depth buffer.', to: '/cg/preview/depth', img: 'https://picsum.photos/id/24/200/200', tags: [] },
];

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

export function Cg() {
  // const isSystemDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  const isSystemDarkMode = true
  const [darkMode, setDarkMode] = useState(isSystemDarkMode)
  let navigate = useNavigate()

  return (
    <main>
      {/* Hero unit */}
      <Box
        sx={{
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h3"
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
            <Button size="large" variant="contained">Main call to action</Button>
            <Button size="large" variant="outlined">Secondary action</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ pb: 8, mt: 3 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={3}>
          {topics.map((topic) => (
            <Grid item key={topic.to} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%' }}                >
                <CardActionArea onClick={() => navigate(topic.to)} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      height: 150,
                    }}
                    image={topic.img}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1, width: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {topic.title}
                    </Typography>
                    <Typography>
                      {topic.description}
                    </Typography>
                    {topic.tags.map(tag => <Chip key={tag} size="small" sx={{ mr: 1, mt: 1 }} label={tag} />)}
                    {topic.links && <Divider sx={{ my: 1   }} />}
                    {topic.links?.map(link => <Typography sx={{ mt: .5, overflow: 'hidden', fontSize: '.7rem', whiteSpace: 'nowrap', width: 1, textOverflow: 'ellipsis' }}><Link target="_blank" href={link.href}>{link.name}</Link></Typography>)}
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ p: 6 }} component="footer">
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
    </main>
  );
}

export default Cg