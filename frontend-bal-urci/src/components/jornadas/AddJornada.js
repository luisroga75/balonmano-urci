import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, MenuItem, Grid } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export default function AddJornada() {
  const [form, setForm] = useState({
    numero_jornada: '',
    categoria: '',
    genero: '',
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
      numero_jornada: Number(form.numero_jornada),
      goles_local: Number(form.goles_local),
      goles_visitante: Number(form.goles_visitante),
    });
    alert('Jornada añadida correctamente.');
    setForm({
      numero_jornada: '', categoria: '', genero: '',
      equipo_local: '', equipo_visitante: '', fecha: '',
      hora: '', lugar: '', goles_local: '', goles_visitante: ''
    });
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Añadir Nueva Jornada</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField label="Número de jornada" name="numero_jornada" type="number" fullWidth required value={form.numero_jornada} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField select label="Categoría" name="categoria" fullWidth required value={form.categoria} onChange={handleChange}>
              <MenuItem value="benjamin">Benjamín</MenuItem>
              <MenuItem value="infantil">Infantil</MenuItem>
              <MenuItem value="cadete">Cadete</MenuItem>
              <MenuItem value="juvenil">Juvenil</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField select label="Género" name="genero" fullWidth required value={form.genero} onChange={handleChange}>
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="femenino">Femenino</MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <TextField label="Equipo Local" name="equipo_local" fullWidth required margin="normal" value={form.equipo_local} onChange={handleChange} />
        <TextField label="Equipo Visitante" name="equipo_visitante" fullWidth required margin="normal" value={form.equipo_visitante} onChange={handleChange} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField type="date" name="fecha" fullWidth required margin="normal" value={form.fecha} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField type="time" name="hora" fullWidth required margin="normal" value={form.hora} onChange={handleChange} />
          </Grid>
        </Grid>

        <TextField label="Lugar" name="lugar" fullWidth required margin="normal" value={form.lugar} onChange={handleChange} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField label="Goles Equipo Local" name="goles_local" type="number" fullWidth required margin="normal" value={form.goles_local} onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Goles Equipo Visitante" name="goles_visitante" type="number" fullWidth required margin="normal" value={form.goles_visitante} onChange={handleChange} />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Añadir Jornada
        </Button>
      </Box>
    </Container>
  );
}
