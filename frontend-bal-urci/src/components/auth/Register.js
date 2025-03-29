import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { TextField, Button, Box } from '@mui/material';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    } catch (error) {
      alert('Error en registro: ' + error.message);
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister}>
      <TextField label="Correo electrónico" type="email" fullWidth required margin="normal"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth required margin="normal"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Registrarse
      </Button>
    </Box>
  );
}
