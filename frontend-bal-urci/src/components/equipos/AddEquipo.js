import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default function AddEquipo() {
  const [form, setForm] = useState({
    nombre: '',
    categoria: '',
    genero: '',
    entrenador: '',
    lugar_entrenamiento: '',
    horario_entrenamiento: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'equipos'), form);
    alert('Equipo añadido correctamente.');
    setForm({ nombre: '', categoria: '', genero: '', entrenador: '', lugar_entrenamiento: '', horario_entrenamiento: '' });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Añadir Nuevo Equipo</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="Nombre del equipo" name="nombre" fullWidth required margin="normal" value={form.nombre} onChange={handleChange} />
        <TextField select label="Categoría" name="categoria" fullWidth required margin="normal" value={form.categoria} onChange={handleChange}>
          <MenuItem value="benjamin">Benjamín</MenuItem>
          <MenuItem value="infantil">Infantil</MenuItem>
          <MenuItem value="cadete">Cadete</MenuItem>
          <MenuItem value="juvenil">Juvenil</MenuItem>
        </TextField>
        <TextField select label="Género" name="genero" fullWidth required margin="normal" value={form.genero} onChange={handleChange}>
          <MenuItem value="masculino">Masculino</MenuItem>
          <MenuItem value="femenino">Femenino</MenuItem>
        </TextField>
        <TextField label="Entrenador/a" name="entrenador" fullWidth required margin="normal" value={form.entrenador} onChange={handleChange} />
        <TextField label="Lugar de entrenamiento" name="lugar_entrenamiento" fullWidth required margin="normal" value={form.lugar_entrenamiento} onChange={handleChange} />
        <TextField label="Horario de entrenamiento" name="horario_entrenamiento" fullWidth required margin="normal" value={form.horario_entrenamiento} onChange={handleChange} />
        <Button type="submit" variant="contained" color="primary">Añadir Equipo</Button>
      </Box>
    </Container>
  );
}
