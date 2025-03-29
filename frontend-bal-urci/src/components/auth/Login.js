import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { TextField, Button, Box } from '@mui/material';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('¡Sesión iniciada correctamente!');
    } catch (error) {
      alert('Error en inicio de sesión: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleLogin}>
      <TextField label="Correo electrónico" type="email" fullWidth required margin="normal"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth required margin="normal"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Iniciar sesión
      </Button>
    </Box>
  );
}
