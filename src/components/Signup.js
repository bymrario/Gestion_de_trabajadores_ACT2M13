import React from 'react';
import './Signup.css';


function Signup() {
  return (
    <div className="signup-container">
      <div className="form-container">
        <div className="form-content">
          <h2 className="title">Crear Cuenta</h2>
          <form>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input type="text" placeholder="Nombre Completo" maxLength="100" required />
            </div>
            <div className="form-group">
              <label>DNI</label>
              <input type="text" placeholder="DNI" pattern="^\d{8}[A-Z]$" required  title="Debe tener 8 números seguidos de una letra mayúscula."/>
            </div>
            <div className="form-group">
              <label>Correo</label>
              <input type="email" placeholder="Correo" pattern="^[a-zA-Z0-9._%+-]+@empresa\.com$" required title='Correo de la empresa ***@empresa.com' />
            </div>
            <div className="form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="Contraseña" minLength="6" required title='Debe contener al menos 6 carácteres'/>
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="tel" placeholder="Teléfono" pattern="^\d{9}$" required title='Debe tener 9 números'/>
            </div>
            <div className="form-group">
              <label>Departamento</label>
              <select name="departamento" required >
                <option value="" disabled selected>Selecciona un departamento</option>
                <option value="ventas">Ventas</option>
                <option value="recursos_humanos">Recursos Humanos</option>
                <option value="desarrollo">Desarrollo</option>
                <option value="marketing">Marketing</option>
                <option value="finanzas">Finanzas</option>
              </select>
            </div>
            <div className="form-group">
              <label>Horario de Trabajo</label>
              <select name="horario" required>
                <option value="" disabled selected>Selecciona un horario</option>
                <option value="08-16">08:00 - 16:00</option>
                <option value="09-17">09:00 - 17:00</option>
                <option value="10-18">10:00 - 18:00</option>
              </select>
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
    </div>
  );
}

export default Signup;


