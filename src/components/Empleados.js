import React, { useState } from 'react';
import './Empleados.css';

const Empleados = () => {
  const employees = [
    { dni: '12345678A', name: 'Juan Pérez', position: 'Desarrollador', email: 'juan.perez@empresa.com', phone: '123456789', permissions: 'Admin', workHours: '9:00 - 17:00' },
    { dni: '87654321B', name: 'Ana Gómez', position: 'Diseñadora', email: 'ana.gomez@empresa.com', phone: '987654321', permissions: 'User', workHours: '10:00 - 18:00' },
    { dni: '12312312C', name: 'Carlos López', position: 'Gerente', email: 'carlos.lopez@empresa.com', phone: '456123789', permissions: 'Admin', workHours: '8:00 - 16:00' },
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  return (
    <div className="employee-list-container">
      <h2>Empleados</h2>
      <div className="employee-cards">
        {employees.map((employee) => (
          <div className="employee-card" key={employee.dni} onClick={() => handleShowDetails(employee)}>
            <h3>{employee.name}</h3>
            <p>{employee.position}</p>
            <button className="view-more-button">Ver más</button>
          </div>
        ))}
      </div>

      {selectedEmployee && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Detalles de {selectedEmployee.name}</h3>
            <p><strong>DNI:</strong> {selectedEmployee.dni}</p>
            <p><strong>Correo:</strong> {selectedEmployee.email}</p>
            <p><strong>Teléfono:</strong> {selectedEmployee.phone}</p>
            <p><strong>Permisos:</strong> {selectedEmployee.permissions}</p>
            <p><strong>Horario de trabajo:</strong> {selectedEmployee.workHours}</p>
            <button className="close-button" onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;

