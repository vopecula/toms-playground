import { Container, Typography } from "@mui/material";

export default function DefaultTopic() {
  return <Container maxWidth="md" sx={{ my: 3 }}>
    <Typography variant="h3">Default Title</Typography>
    <Typography variant="subtitle1">Subtitle1</Typography>


    <Typography variant="h4">Idea</Typography>
  </Container>
}