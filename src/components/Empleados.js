import React, { useState, useEffect } from 'react';  
import './Empleados.css';  
import app from './config/firebaseConfig'; // Asegúrate de que la ruta sea correcta
import { getFirestore, collection, getDocs } from "firebase/firestore";


const Empleados = () => {  
  const [employees, setEmployees] = useState([]);  

  const db = getFirestore(app); // Inicializa Firestore

 // Función para obtener empleados de Firestore
 const fetchEmployees = async () => {
  const empleadosCollection = collection(db, 'empleados');
  const empleadosSnapshot = await getDocs(empleadosCollection);
  const empleadosList = empleadosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  setEmployees(empleadosList);
};

// Llama a la función fetchEmployees cuando el componente se monte
useEffect(() => {
  fetchEmployees();
}, []);

const [selectedEmployee, setSelectedEmployee] = useState(null);  
const [isEditing, setIsEditing] = useState(false);  
const [isAdding, setIsAdding] = useState(false);  
const [formData, setFormData] = useState({ dni: '', name: '', position: '', email: '', phone: '', permissions: '', workHours: '' });   

  //Detalles de empleados en una pantalla modal
  const handleShowDetails = (employee) => {  
    setSelectedEmployee(employee);  
    setIsEditing(false);  //Desactiva edición
    setIsAdding(false);  //Desactiva agregar
    setFormData(employee); // Cargar datos del empleado en el formulario  
  };  
//Cierra el modal y reinicia los datos del formulario
  const handleCloseModal = () => {  
    setSelectedEmployee(null);  
    setIsEditing(false);  
    setIsAdding(false); // Reiniciar el estado de agregar  
    setFormData({ dni: '', name: '', position: '', email: '', phone: '', permissions: '', workHours: '' }); // Reiniciar el formulario  
  };  

  //Actualiza el formulario 
  const handleInputChange = (e) => {  
    const { name, value } = e.target;  
    setFormData({ ...formData, [name]: value });  
  };  
//Actualiza el formulario ya sea para editar o agregar
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

  //Activa el modo de edición de empleado
  const handleEdit = (employee) => {  
    setSelectedEmployee(employee);  
    setIsEditing(true);  
    setIsAdding(false); 
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