import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, Grid } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import AddJornada from '../components/jornadas/AddJornada';
import { useAuth } from '../context/AuthContext';

export default function Jornadas() {
  const [jornadas, setJornadas] = useState([]);
  const { rol } = useAuth();

  useEffect(() => {
    const obtenerJornadas = async () => {
      const querySnapshot = await getDocs(collection(db, 'jornadas'));
      setJornadas(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    obtenerJornadas();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Jornadas y Resultados</Typography>
      {rol === 'admin' && <AddJornada />}
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {jornadas.map(jornada => (
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
        ))}
      </Grid>
    </Container>
  );
}

