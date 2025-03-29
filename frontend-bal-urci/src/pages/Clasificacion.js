import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function Clasificacion() {
  const [clasificacion, setClasificacion] = useState([]);
  const [categoria, setCategoria] = useState('infantil');
  const [genero, setGenero] = useState('masculino');

  useEffect(() => {
    const calcularClasificacion = async () => {
      const q = query(collection(db, 'jornadas'), 
        where('categoria', '==', categoria), 
        where('genero', '==', genero));

      const querySnapshot = await getDocs(q);
      const resultados = querySnapshot.docs.map(doc => doc.data());

      let equipos = {};

      resultados.forEach(({ equipo_local, equipo_visitante, goles_local, goles_visitante }) => {
        if (!equipos[equipo_local]) equipos[equipo_local] = { puntos: 0, golesFavor: 0, golesContra: 0 };
        if (!equipos[equipo_visitante]) equipos[equipo_visitante] = { puntos: 0, golesFavor: 0, golesContra: 0 };

        equipos[equipo_local].golesFavor += goles_local;
        equipos[equipo_local].golesContra += goles_visitante;

        equipos[equipo_visitante].golesFavor += goles_visitante;
        equipos[equipo_visitante].golesContra += goles_local;

        if (goles_local > goles_visitante) {
          equipos[equipo_local].puntos += 3;
        } else if (goles_local < goles_visitante) {
          equipos[equipo_visitante].puntos += 3;
        } else {
          equipos[equipo_local].puntos += 1;
          equipos[equipo_visitante].puntos += 1;
        }
      });

      const tabla = Object.entries(equipos).map(([nombre, stats]) => ({
        nombre,
        puntos: stats.puntos,
        golesFavor: stats.golesFavor,
        golesContra: stats.golesContra,
        diferencia: stats.golesFavor - stats.golesContra,
      }));

      tabla.sort((a, b) => b.puntos - a.puntos || b.diferencia - a.diferencia);

      setClasificacion(tabla);
    };

    calcularClasificacion();
  }, [categoria, genero]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Clasificación por Categoría y Género</Typography>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
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

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Género</InputLabel>
            <Select value={genero} label="Género" onChange={(e) => setGenero(e.target.value)}>
              <MenuItem value="masculino">Masculino</MenuItem>
              <MenuItem value="femenino">Femenino</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Posición</strong></TableCell>
              <TableCell><strong>Equipo</strong></TableCell>
              <TableCell align="right"><strong>Puntos</strong></TableCell>
              <TableCell align="right"><strong>Goles a favor</strong></TableCell>
              <TableCell align="right"><strong>Goles en contra</strong></TableCell>
              <TableCell align="right"><strong>Diferencia</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clasificacion.map((equipo, index) => (
              <TableRow key={equipo.nombre}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{equipo.nombre}</TableCell>
                <TableCell align="right">{equipo.puntos}</TableCell>
                <TableCell align="right">{equipo.golesFavor}</TableCell>
                <TableCell align="right">{equipo.golesContra}</TableCell>
                <TableCell align="right">{equipo.diferencia}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
