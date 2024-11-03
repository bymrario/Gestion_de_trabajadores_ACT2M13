import React, { useState } from 'react';
import './Tareas.css';

const Tareas = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Actualizar el sistema', status: 'Pendiente', details: 'Actualizar todas las bibliotecas del proyecto.' },
    { id: 2, title: 'Revisar diseño', status: 'En progreso', details: 'Revisar el diseño de la nueva interfaz de usuario.' },
    { id: 3, title: 'Desplegar nueva versión', status: 'Completado', details: 'Desplegar la nueva versión en producción.' },
  ]);

  const [selectedTask, setSelectedTask] = useState(null);

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const handleShowDetails = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="tasks-container">
      <h2>Tareas</h2>
      <div className="task-cards">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>Estado: <span className={`status ${task.status.toLowerCase()}`}>{task.status}</span></p>
            <select value={task.status} onChange={(e) => handleStatusChange(task.id, e.target.value)}>
              <option value="Pendiente">Pendiente</option>
              <option value="Progreso">En progreso</option>
              <option value="Completado">Completado</option>
            </select>
            <button onClick={() => handleShowDetails(task)}>Ver más</button>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedTask.title}</h2>
            <p><strong>Estado:</strong> {selectedTask.status}</p>
            <p><strong>Detalles:</strong> {selectedTask.details}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tareas;
