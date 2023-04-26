import React from 'react'
import { Container, Typography } from "@mui/material";

export default function DynamicTextureTopic(){
  return <Container maxWidth="md" sx={{my: 3}}>
    <Typography variant="h3">Dynamic Textures</Typography>
    <Typography variant="subtitle1">Have more smaller textures to increase texture variance.</Typography>

    
    <Typography variant="h4">Idea</Typography>
    <Typography variant="h4">Collecting reference</Typography>
    <Typography variant="h4">Study, finding patterns</Typography>
  </Container>
}