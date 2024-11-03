import React, { useState } from 'react';  
import './Empleados.css';  

const Empleados = () => {  
  const [employees, setEmployees] = useState([  
    { dni: '12345678A', name: 'Juan Pérez', position: 'Desarrollador', email: 'juan.perez@empresa.com', phone: '123456789', permissions: 'Admin', workHours: '9:00 - 17:00' },  
    { dni: '87654321B', name: 'Ana Gómez', position: 'Diseñadora', email: 'ana.gomez@empresa.com', phone: '987654321', permissions: 'User', workHours: '10:00 - 18:00' },  
    { dni: '12312312C', name: 'Carlos López', position: 'Gerente', email: 'carlos.lopez@empresa.com', phone: '456123789', permissions: 'Admin', workHours: '8:00 - 16:00' },  
  ]);  

  const [selectedEmployee, setSelectedEmployee] = useState(null);  
  const [isEditing, setIsEditing] = useState(false);  
  const [isAdding, setIsAdding] = useState(false); // Nuevo estado para agregar empleados  
  const [formData, setFormData] = useState({ dni: '', name: '', position: '', email: '', phone: '', permissions: '', workHours: '' });  

  const handleShowDetails = (employee) => {  
    setSelectedEmployee(employee);  
    setIsEditing(false);  
    setIsAdding(false); // Asegurarse de que no esté en modo agregar  
    setFormData(employee); // Cargar datos del empleado en el formulario  
  };  

  const handleCloseModal = () => {  
    setSelectedEmployee(null);  
    setIsEditing(false);  
    setIsAdding(false); // Reiniciar el estado de agregar  
    setFormData({ dni: '', name: '', position: '', email: '', phone: '', permissions: '', workHours: '' }); // Reiniciar el formulario  
  };  

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });  
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    if (isEditing) {  
      // Editar empleado  
      setEmployees(employees.map(employee => (employee.dni === formData.dni ? formData : employee)));  
    } else if (isAdding) {  
      // Agregar nuevo empleado  
      setEmployees([...employees, formData]);  
    }  
    handleCloseModal(); // Cerrar el modal  
  };  

  const handleEdit = (employee) => {  
    setSelectedEmployee(employee);  
    setIsEditing(true);  
    setIsAdding(false); // Asegurarse de que no esté en modo agregar  
    setFormData(employee); // Cargar datos del empleado en el formulario  
  };  

  return (  
    <div className="employee-list-container">  
      <h2>Empleados</h2>  
      <button className="add-button" onClick={() => { handleCloseModal(); setIsAdding(true); }}>Agregar Empleado</button>  
      <div className="employee-cards">  
        {employees.map((employee) => (  
          <div className="employee-card" key={employee.dni}>  
            <h3>{employee.name}</h3>  
            <p>{employee.position}</p>  
            <button className="view-more-button" onClick={() => handleShowDetails(employee)}>Ver más</button>  
            <button className="edit-button" onClick={() => handleEdit(employee)}>Editar</button>  
          </div>  
        ))}  
      </div>  

      {(selectedEmployee || isEditing || isAdding) && (  
        <div className="modal-overlay" onClick={handleCloseModal}>  
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>  
            <h3>{isAdding ? 'Agregar Empleado' : (isEditing ? 'Editar Empleado' : 'Detalles de ' + selectedEmployee.name)}</h3>  
            <form onSubmit={handleSubmit}>  
              <input type="text" name="dni" placeholder="DNI" value={formData.dni} onChange={handleInputChange} required />  
              <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleInputChange} required />  
              <input type="text" name="position" placeholder="Posición" value={formData.position} onChange={handleInputChange} required />  
              <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleInputChange} required />  
              <input type="tel" name="phone" placeholder="Teléfono" value={formData.phone} onChange={handleInputChange} required />  
              <input type="text" name="permissions" placeholder="Permisos" value={formData.permissions} onChange={handleInputChange} required />  
              <input type="text" name="workHours" placeholder="Horario de trabajo" value={formData.workHours} onChange={handleInputChange} required />  
              <button type="submit" className="submit-button">{isAdding ? 'Agregar' : (isEditing ? 'Actualizar' : 'Cerrar')}</button>  
              <button className="close-button" onClick={handleCloseModal}>Cerrar</button>  
            </form>  
          </div>  
        </div>  
      )}  
    </div>  
  );  
};  

export default Empleados;