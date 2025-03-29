import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import AddEquipo from '../components/equipos/AddEquipo';

export default function Equipos() {
  const [equipos, setEquipos] = useState([]);
  const { rol } = useAuth();

  useEffect(() => {
    const obtenerEquipos = async () => {
      const querySnapshot = await getDocs(collection(db, 'equipos'));
      setEquipos(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    obtenerEquipos();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Equipos del Club URCI</Typography>
      {rol === 'admin' && <AddEquipo />}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {equipos.map(equipo => (
          <Grid item xs={12} md={6} lg={4} key={equipo.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" color="primary">{equipo.nombre}</Typography>
                <Typography><strong>Categoría:</strong> {equipo.categoria}</Typography>
                <Typography><strong>Género:</strong> {equipo.genero}</Typography>
                <Typography><strong>Entrenador/a:</strong> {equipo.entrenador}</Typography>
                <Typography><strong>Lugar:</strong> {equipo.lugar_entrenamiento}</Typography>
                <Typography><strong>Horario:</strong> {equipo.horario_entrenamiento}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
