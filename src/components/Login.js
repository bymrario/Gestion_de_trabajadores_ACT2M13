import React from 'react';
import './Login.css';

function Login() {
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

