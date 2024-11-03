import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe automáticamente
    try {
      const response = await axios.post('http://localhost:8082/login', {
        usernameOrEmail: username,
        password: password,
      });

      const responseData = response.data;

      if (responseData.includes("Login exitoso")) {
        toast.success(responseData, { autoClose: 2000 });
        setTimeout(() => navigate('/home'), 2000);
      } else if (responseData.includes("Contraseña Incorrecta")) {
        toast.error("Error: Contraseña Incorrecta", { autoClose: 3000 });
      } else if (responseData.includes("Usuario no encontrado")) {
        toast.error("Error: Usuario no encontrado", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Error en el servidor. Intente nuevamente", { autoClose: 3000 });
    }
  };

  return (
    <div className="login-container">  
      <h1>Bienvenid@</h1> 
      <div className="login-box">
        <h2>Inicio de Sesión</h2>
        <form>
          <input
            type="text"
            placeholder="Usuario"
            className="input-field"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-field"
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <p className="create-account">
          ¿No tienes una cuenta? <a href="/signup">Crea una aquí</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

