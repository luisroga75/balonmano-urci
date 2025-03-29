// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Navbar from './components/layout/Navbar';
import { useAuth } from './context/AuthContext';
import Equipos from './pages/Equipos';
import Jornadas from './pages/Jornadas';
import Clasificacion from './pages/Clasificacion';
import Container from '@mui/material/Container';
import EditEquipo from './components/equipos/EditEquipo';
import EditJornada from './components/jornadas/EditJornada';

const Home = () => (
  <Container sx={{ mt: 4 }}>
    <h2>Página Principal del Club URCI (Contenido protegido)</h2>
  </Container>
);

function App() {
  const { user, rol } = useAuth();

  return (
    <BrowserRouter>
      {user && <Navbar />}
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" replace />} />
        <Route path="/equipos" element={user ? <Equipos /> : <Navigate to="/auth" replace />} />
        <Route path="/equipos/editar/:id" element={rol === 'admin' ? <EditEquipo /> : <Navigate to="/" replace />} />
        <Route path="/jornadas" element={user ? <Jornadas /> : <Navigate to="/auth" replace />} />
        <Route path="/jornadas/editar/:id" element={rol === 'admin' ? <EditJornada /> : <Navigate to="/" replace />} />
        <Route path="/clasificacion" element={user ? <Clasificacion /> : <Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
