import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import AddJornada from '../components/jornadas/AddJornada';
import { useAuth } from '../context/AuthContext';

export default function Jornadas() {
  const [jornadas, setJornadas] = useState([]);
  const { rol } = useAuth();
  const [categoria, setCategoria] = useState('infantil');
  const [genero, setGenero] = useState('masculino');
  const [numeroJornada, setNumeroJornada] = useState(1);

  useEffect(() => {
    const obtenerJornadas = async () => {
      const q = query(
        collection(db, 'jornadas'),
        where('categoria', '==', categoria),
        where('genero', '==', genero),
        where('numero_jornada', '==', numeroJornada)
      );
      const querySnapshot = await getDocs(q);
      setJornadas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    obtenerJornadas();
  }, [categoria, genero, numeroJornada]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Jornadas y Resultados</Typography>
      {rol === 'admin' && <AddJornada />}

      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Categoría</InputLabel>
              <Select value={categoria} label="Categoría" onChange={(e) => setCategoria(e.target.value)}>
                <MenuItem value="benjamin">Benjamín</MenuItem>
                <MenuItem value="infantil">Infantil</MenuItem>
                <MenuItem value="cadete">Cadete</MenuItem>
                <MenuItem value="juvenil">Juvenil</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Género</InputLabel>
              <Select value={genero} label="Género" onChange={(e) => setGenero(e.target.value)}>
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Nº Jornada</InputLabel>
              <Select value={numeroJornada} label="Nº Jornada" onChange={(e) => setNumeroJornada(Number(e.target.value))}>
  {[...Array(20).keys()].map((n) => (
    <MenuItem key={n+1} value={n+1}>{n+1}</MenuItem>
  ))}
</Select>

            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {jornadas.length > 0 ? jornadas.map(jornada => (
          <Grid item xs={12} md={6} lg={4} key={jornada.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">
                  {jornada.equipo_local} vs {jornada.equipo_visitante}
                </Typography>
                <Typography><strong>Fecha:</strong> {jornada.fecha}</Typography>
                <Typography><strong>Hora:</strong> {jornada.hora}</Typography>
                <Typography><strong>Lugar:</strong> {jornada.lugar}</Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  Resultado: {jornada.goles_local} - {jornada.goles_visitante}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )) : (
          <Grid item xs={12}>
            <Typography sx={{ mt: 2 }}>No hay partidos para esta combinación.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
