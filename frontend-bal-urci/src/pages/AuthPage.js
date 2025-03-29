import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function AuthPage() {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => setValue(newValue);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Balonmano URCI
        </Typography>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Iniciar Sesión" />
          <Tab label="Registrarse" />
        </Tabs>
        <Box sx={{ mt: 3 }}>
          {value === 0 && <Login />}
          {value === 1 && <Register />}
        </Box>
      </Box>
    </Container>
  );
}
