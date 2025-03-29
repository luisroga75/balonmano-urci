import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" color="primary" gutterBottom>
        ¡Bienvenidos a Balonmano URCI!
      </Typography>
      <Button variant="contained" color="primary">
        Botón de prueba
      </Button>
    </Container>
  );
}

export default App;

