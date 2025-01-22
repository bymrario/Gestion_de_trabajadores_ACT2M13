import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    correo: '',
    contrasena: '',
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/registrarUsuario', formData);
      const responseData = response.data;

      // Muestra el mensaje de respuesta del backend
      if (responseData.includes("Usuario creado")) {
        toast.success(responseData, { autoClose: 2000 });
        setTimeout(() => history.push('/'), 2000);
      } else if (responseData.includes("Error")) {
        toast.error(responseData, { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Error en el servidor. Intente nuevamente", { autoClose: 3000 });
    }
  };

  return (
    <div className="signup-container">
      <div className="form-container">
        <div className="form-content">
          <h2 className="title">Crear Cuenta</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre de Usuario</label>
              <input type="text" name="nombreUsuario" placeholder="Nombre de Usuario" maxLength="100" required onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input type="email" name="correo" placeholder="Correo" pattern="^[a-zA-Z0-9._%+-]+@empresa\.com$" required onChange={handleChange} title='Correo de la empresa ***@empresa.com' />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" name="contrasena" placeholder="Contraseña" minLength="6" required onChange={handleChange} title='Debe contener al menos 6 carácteres' />
            </div>
            <div className='form-button'>
              <button type="submit" className="submit-button">Registrarse</button>
            </div>
          </form>
        </div>
      </div>
      <div className="logo-container">
        <img src=" /logo linkia.jpg" alt="Logo" />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default Signup;