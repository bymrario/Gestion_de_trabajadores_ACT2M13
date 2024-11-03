import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Empleados from './components/Empleados';
import Registros from './components/Registros';
import Informes from './components/Informes';
import Tareas from './components/Tareas';

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta para la pantalla de login */}
          <Route path="/" element={<Login />} />
          
          {/* Ruta para la pantalla de creación de usuario */}
          <Route path="/signup" element={<Signup />} />

          {/* Ruta para la pantalla de Home */}
          <Route path="/home" element={<Home />} />

           {/* Ruta para la pantalla de Empleados */}
           <Route path="/empleados" element={<Empleados />} />

          {/* Ruta para la pantalla de Registros */}
           <Route path="/registros" element={<Registros />} />

           {/* Ruta para la pantalla de Informes */}
           <Route path="/informes" element={<Informes />} />

            {/* Ruta para la pantalla de Tareas */}
            <Route path="/tareas" element={<Tareas />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
