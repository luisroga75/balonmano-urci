import React, { useState, useEffect } from 'react';
import { doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { Container, TextField, Button, Typography, Box, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditEquipo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [equipo, setEquipo] = useState({
    nombre: '', categoria: '', genero: '',
    entrenador: '', lugar_entrenamiento: '', horario_entrenamiento: ''
  });

  useEffect(() => {
    const cargarEquipo = async () => {
      const docSnap = await getDoc(doc(db, 'equipos', id));
      setEquipo(docSnap.data());
    };
    cargarEquipo();
  }, [id]);

  const handleChange = (e) => {
    setEquipo({ ...equipo, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, 'equipos', id), equipo);
    alert('Equipo actualizado correctamente.');
    navigate('/equipos');
  };

  const handleDelete = async () => {
    if(window.confirm('¿Seguro que deseas eliminar este equipo?')) {
      await deleteDoc(doc(db, 'equipos', id));
      alert('Equipo eliminado.');
      navigate('/equipos');
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Editar Equipo</Typography>
      <Box component="form" onSubmit={handleUpdate}>
        <TextField label="Nombre" name="nombre" fullWidth required margin="normal" value={equipo.nombre} onChange={handleChange} />
        <TextField select label="Categoría" name="categoria" fullWidth required margin="normal" value={equipo.categoria} onChange={handleChange}>
          {['benjamin', 'infantil', 'cadete', 'juvenil'].map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
        </TextField>
        <TextField select label="Género" name="genero" fullWidth required margin="normal" value={equipo.genero} onChange={handleChange}>
          <MenuItem value="masculino">Masculino</MenuItem>
          <MenuItem value="femenino">Femenino</MenuItem>
        </TextField>
        <TextField label="Entrenador" name="entrenador" fullWidth required margin="normal" value={equipo.entrenador} onChange={handleChange} />
        <TextField label="Lugar Entrenamiento" name="lugar_entrenamiento" fullWidth required margin="normal" value={equipo.lugar_entrenamiento} onChange={handleChange} />
        <TextField label="Horario Entrenamiento" name="horario_entrenamiento" fullWidth required margin="normal" value={equipo.horario_entrenamiento} onChange={handleChange} />
        
        <Button type="submit" variant="contained" sx={{ mt:2 }}>Guardar Cambios</Button>
        <Button color="error" variant="outlined" onClick={handleDelete} sx={{ mt:2, ml:2 }}>Eliminar Equipo</Button>
      </Box>
    </Container>
  );
}
