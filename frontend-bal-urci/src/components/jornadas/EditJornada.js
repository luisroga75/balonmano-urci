import React, { useState, useEffect } from 'react';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Container, TextField, Button, Typography, Box, MenuItem, Grid } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditJornada() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [jornada, setJornada] = useState({
    numero_jornada: '', categoria: '', genero: '',
    equipo_local: '', equipo_visitante: '', fecha: '',
    hora: '', lugar: '', goles_local: '', goles_visitante: ''
  });

  useEffect(() => {
    const cargarJornada = async () => {
      const docSnap = await getDoc(doc(db, 'jornadas', id));
      setJornada(docSnap.data());
    };
    cargarJornada();
  }, [id]);

  const handleChange = (e) => {
    setJornada({ ...jornada, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'jornadas', id), {
      ...jornada,
      numero_jornada: Number(jornada.numero_jornada),
      goles_local: Number(jornada.goles_local),
      goles_visitante: Number(jornada.goles_visitante),
    });
    alert('Jornada actualizada correctamente.');
    navigate('/jornadas');
  };

  const handleDelete = async () => {
    if(window.confirm('¿Seguro que deseas eliminar esta jornada?')) {
      await deleteDoc(doc(db, 'jornadas', id));
      alert('Jornada eliminada.');
      navigate('/jornadas');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Editar Jornada</Typography>
      <Box component="form" onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField label="Número jornada" name="numero_jornada" type="number" fullWidth required value={jornada.numero_jornada} onChange={handleChange} />
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Categoría" name="categoria" fullWidth required value={jornada.categoria} onChange={handleChange}>
              {['benjamin', 'infantil', 'cadete', 'juvenil'].map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={4}>
            <TextField select label="Género" name="genero" fullWidth required value={jornada.genero} onChange={handleChange}>
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="femenino">Femenino</MenuItem>
            </TextField>
          </Grid>
        </Grid>
        
        <TextField label="Equipo Local" name="equipo_local" fullWidth required margin="normal" value={jornada.equipo_local} onChange={handleChange} />
        <TextField label="Equipo Visitante" name="equipo_visitante" fullWidth required margin="normal" value={jornada.equipo_visitante} onChange={handleChange} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField type="date" name="fecha" fullWidth required margin="normal" value={jornada.fecha} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField type="time" name="hora" fullWidth required margin="normal" value={jornada.hora} onChange={handleChange} />
          </Grid>
        </Grid>

        <TextField label="Lugar" name="lugar" fullWidth required margin="normal" value={jornada.lugar} onChange={handleChange} />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField label="Goles Local" name="goles_local" type="number" fullWidth required margin="normal" value={jornada.goles_local} onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Goles Visitante" name="goles_visitante" type="number" fullWidth required margin="normal" value={jornada.goles_visitante} onChange={handleChange} />
          </Grid>
        </Grid>

        <Button type="submit" variant="contained" sx={{ mt:2 }}>Guardar Cambios</Button>
        <Button color="error" variant="outlined" onClick={handleDelete} sx={{ mt:2, ml:2 }}>Eliminar Jornada</Button>
      </Box>
    </Container>
  );
}
