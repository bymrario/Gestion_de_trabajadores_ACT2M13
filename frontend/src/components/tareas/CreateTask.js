import React, { useState } from 'react';
import axios from 'axios';

const CreateTaskModal = ({ isOpen, onClose }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('pendiente');
    const [prioridad, setPrioridad] = useState('alta');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto de la tarea
        const tarea = {
            titulo,
            descripcion,
            estado,
            etiqueta: '', 
            fechaVencimiento,
            prioridad,
            empleadoId: '1',
        };

        try {
            // Hacer el POST al backend para agregar la tarea
            const response = await axios.post('/tareas', tarea);

            console.log('Tarea creada:', response.data);
            onClose();
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    if (!isOpen) return null; // Si el modal no está abierto, no lo renderiza

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Crear Nueva Tarea</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título:</label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Estado:</label>
                        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
                            <option value="pendiente">Pendiente</option>
                            <option value="en_proceso">En Proceso</option>
                            <option value="terminado">Terminado</option>
                        </select>
                    </div>
                    <div>
                        <label>Prioridad:</label>
                        <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
                            <option value="alta">Alta</option>
                            <option value="media">Media</option>
                            <option value="baja">Baja</option>
                        </select>
                    </div>
                    <div>
                        <label>Fecha de Vencimiento:</label>
                        <input
                            type="datetime-local"
                            value={fechaVencimiento}
                            onChange={(e) => setFechaVencimiento(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-buttons">
                        <button type="submit">Crear Tarea</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;