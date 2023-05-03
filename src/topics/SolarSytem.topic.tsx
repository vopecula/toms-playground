import { Box, Container, Grid, Typography } from "@mui/material";
import ThreeRenderer from "../components/ThreeRenderer";
import SolarSystem from "../three/SolarSystem.three";

export default function SolarSystemTopic() {
  return <>
    <Container maxWidth="lg" sx={{ my: 3 }}>
      <Grid container spacing={2} sx={{ width: 1, my: 6 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{
            p: 6,
            height: 300,
            bgcolor: 'black',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'flex-end',
            backgroundImage: 'url(/img/solar_system.jpeg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}>
            <Typography variant="h3">Solar System</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ p: 6, height: 300, bgcolor: 'rgb(50,50,50)', borderRadius: 6, display: 'flex', alignItems: 'flex-end' }}>
            <Typography>A basic model from our solar system. Most of the paramters are adjusten to be more visible.</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>

    <Container maxWidth="md" sx={{ my: 3 }}>
      <Typography variant="h4">Idea</Typography>
      <Typography>I wanted to show how our solar system behaves to my son and this is why I creates this.</Typography>

      <ThreeRenderer setup={SolarSystem} />

    </Container>
  </>
}