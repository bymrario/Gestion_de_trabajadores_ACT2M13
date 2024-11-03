import React, { useState } from 'react';
import './Registros.css';

const Registros = () => {
  // Ejemplo de datos de registros
  const registros = [
    { id: '1', fecha: '01 de noviembre de 2024', empleado: 'Juan Pérez', acción: 'Entrada', correo: 'juan@empresa.com', telefono: '123456789', permisos: 'Admin', horario: '9:00 - 17:00' },
    { id: '2', fecha: '01 de noviembre de 2024', empleado: 'Ana Gómez', acción: 'Salida', correo: 'ana@empresa.com', telefono: '987654321', permisos: 'Usuario', horario: '9:00 - 17:00' },
    { id: '3', fecha: '02 de noviembre de 2024', empleado: 'Carlos López', acción: 'Entrada', correo: 'carlos@empresa.com', telefono: '456789123', permisos: 'Editor', horario: '9:00 - 17:00' },
  ];

  // Estado para almacenar el registro seleccionado cuando se quiere ver más detalles
  const [selectedRegistro, setSelectedRegistro] = useState(null);

  // Función para manejar el evento de ver más detalles del registro
  const handleVerMas = (registro) => {
    setSelectedRegistro(registro);
  };

  // Función para cerrar el modal y deseleccionar el registro 
  const handleCloseModal = () => {
    setSelectedRegistro(null);
  };

  return (
    <div className="registro-list-container">
      <h2>Registros</h2>
      <div className="registro-card-container">
        {registros.map((registro) => (
          <div className="registro-card" key={registro.id}>
            <h3>ID: {registro.id}</h3>
            <p>Fecha: {registro.fecha}</p>
            <p>Empleado: {registro.empleado}</p>
            <p>Acción: {registro.acción}</p>
            <button onClick={() => handleVerMas(registro)}>Ver Más</button>
          </div>
        ))}
      </div>
      {selectedRegistro && (
        <Modal registro={selectedRegistro} onClose={handleCloseModal} />
      )}
    </div>
  );
};

const Modal = ({ registro, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Detalles del Registro</h2>
        <p><strong>ID:</strong> {registro.id}</p>
        <p><strong>Fecha:</strong> {registro.fecha}</p>
        <p><strong>Empleado:</strong> {registro.empleado}</p>
        <p><strong>Acción:</strong> {registro.acción}</p>
        <p><strong>Correo:</strong> {registro.correo}</p>
        <p><strong>Teléfono:</strong> {registro.telefono}</p>
        <p><strong>Permisos:</strong> {registro.permisos}</p>
        <p><strong>Horario:</strong> {registro.horario}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Registros;
