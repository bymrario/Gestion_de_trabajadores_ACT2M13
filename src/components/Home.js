import React from 'react';  
import { useNavigate } from 'react-router-dom';
import './Home.css';  

const sampleEmployees = [  
  { dni: '12345678A', name: 'Juan Pérez', position: 'Desarrollador' },  
  { dni: '87654321B', name: 'Ana Gómez', position: 'Diseñadora' },  
  { dni: '12312312C', name: 'Carlos López', position: 'Gerente' },  
];  

function Home() {  
  const navigate = useNavigate(); // Para navegar a la página de inicio de sesión

  const handleLogout = () => {  
    // Aquí puedes implementar la lógica de logout, como eliminar el token, redirigir a la página de inicio de sesión, etc.  
    console.log("Logout Clicked"); 
    navigate('/'); // Redirige a la página de login 
  };  

  return (  
    <div className="home-container">  
      <nav className="sidebar">  
        <h1>Mi Perfil</h1>  
        <ul>  
          <li><a href="/home">Inicio</a></li>  
          <li><a href="/empleados">Empleados</a></li>  
          <li><a href="/registros">Registros</a></li>  
          <li><a href="/tareas">Tareas</a></li>  
          <li><a href="/informes">Informes</a></li>  
        </ul>  
        <button className="logout-button" onClick={handleLogout}>Logout</button>  
      </nav>  
      <div className="main-content">  
        <div className="user-card">  
          <div className="user-info">  
            <h2>Bienvenid@</h2>  
            <h1>User</h1>  
            <p>{new Date().toLocaleString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>  
          </div>  
          <img src="/Oli.jpeg" alt="Perfil" className="profile-image" />  
        </div>  
        
        <div className="card-container">  
          <div className="card">  
            <h3>Empleados</h3>  
            <ul className="preview-list">  
              {sampleEmployees.slice(0, 3).map((employee) => (  
                <li key={employee.dni}>  
                  {employee.name} - {employee.position}  
                </li>  
              ))}  
            </ul>  
            <a href="/empleados" className="view-more">Ver más</a>  
          </div>  
          
          <div className="card">  
            <h3>Registros</h3>  
            <ul className="preview-list">  
              <li>Registro 1 - 08:00 AM</li>  
              <li>Registro 2 - 09:30 AM</li>  
              <li>Registro 3 - 10:15 AM</li>  
            </ul>  
            <a href="/registros" className="view-more">Ver más</a>  
          </div>  
          
          <div className="card">  
            <h3>Informes</h3>  
            <ul className="document-preview-list">  
              <li><a href="/informes/1" target="_blank" rel="noopener noreferrer">Informe de Ventas Q1</a></li>  
              <li><a href="/informes/2" target="_blank" rel="noopener noreferrer">Informe de Progreso del Proyecto</a></li>  
              <li><a href="/informes/3" target="_blank" rel="noopener noreferrer">Informe de Empleados Actuales</a></li>  
            </ul>  
            <a href="/informes" className="view-more">Ver más</a>  
          </div>  

          <div className="card">  
            <h3>Tareas</h3>  
            <div className="task-preview-container">  
              <div className="task-card">  
                <h4>Actualizar Sistema</h4>  
                <p>Es necesario actualizar el sistema</p>  
                <button>Ver más</button>  
              </div>  
              <div className="task-card">  
                <h4>Revisar diseño</h4>  
                <p>Se han producido problemas en el diseño</p>  
                <button>Ver más</button>  
              </div>  
              <div className="task-card">  
                <h4>Desplegar nueva versión</h4>  
                <p>Desplegue la nueva versión</p>  
                <button>Ver más</button>  
              </div>  
            </div>  
            <a href="/tareas" className="view-more">Ver más</a>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
}  

export default Home;