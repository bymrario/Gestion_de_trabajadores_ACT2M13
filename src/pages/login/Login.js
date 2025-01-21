import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        usernameOrEmail: username,
        password: password,
      });

      const responseData = response.data;

      // Verifica el mensaje de respuesta para mostrar el toast adecuado
      if (responseData.includes("Login exitoso")) {
        toast.success(responseData, { autoClose: 2000 });
        localStorage.setItem('usernameOrEmail', username);
        setTimeout(() => history.push('/home'), 2000);
      } else if (responseData.includes("Contraseña incorrecta")) {
        toast.error("Error: Contraseña incorrecta", { autoClose: 3000 });
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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Iniciar Sesión
          </button>
        </form>
        <p className="create-account">
          ¿No tienes una cuenta? <a href="/signup">Crea una aquí</a>
        </p>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Login;
