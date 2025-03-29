import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default function AddJornada() {
  const [form, setForm] = useState({
    equipo_local: '',
    equipo_visitante: '',
    fecha: '',
    hora: '',
    lugar: '',
    goles_local: '',
    goles_visitante: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'jornadas'), {
      ...form,
      goles_local: Number(form.goles_local),
      goles_visitante: Number(form.goles_visitante),
    });
    alert('Jornada añadida correctamente.');
    setForm({ equipo_local: '', equipo_visitante: '', fecha: '', hora: '', lugar: '', goles_local: '', goles_visitante: '' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Añadir Nueva Jornada</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Equipo Local" name="equipo_local" fullWidth required margin="normal" value={form.equipo_local} onChange={handleChange} />
        <TextField label="Equipo Visitante" name="equipo_visitante" fullWidth required margin="normal" value={form.equipo_visitante} onChange={handleChange} />
        <TextField type="date" name="fecha" fullWidth required margin="normal" value={form.fecha} onChange={handleChange} />
        <TextField type="time" name="hora" fullWidth required margin="normal" value={form.hora} onChange={handleChange} />
        <TextField label="Lugar" name="lugar" fullWidth required margin="normal" value={form.lugar} onChange={handleChange} />
        <TextField label="Goles Equipo Local" name="goles_local" type="number" fullWidth required margin="normal" value={form.goles_local} onChange={handleChange} />
        <TextField label="Goles Equipo Visitante" name="goles_visitante" type="number" fullWidth required margin="normal" value={form.goles_visitante} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Añadir Jornada</Button>
      </Box>
    </Container>
  );
}
