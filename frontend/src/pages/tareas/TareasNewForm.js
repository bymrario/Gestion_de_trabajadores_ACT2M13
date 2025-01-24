import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    formContainer: {
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto',
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        outline: 'none',
        '&:focus': {
            borderColor: '#6a11cb',
        },
    },
    textarea: {
        width: '100%',
        height: '150px',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        outline: 'none',
        '&:focus': {
            borderColor: '#6a11cb',
        },
    },
    select: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#93C572',
        color: 'white',
        fontSize: '18px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        '&:hover': {
            backgroundColor: '#7fae4d',
        },
    },
});

function TareasNewForm() {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Borrador');
    const [tag, setTag] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('alta');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const nuevaTarea = {
            titulo: title,
            descripcion: description,
            estado: status,
            etiqueta: tag,
            fechaVencimiento: dueDate,
            prioridad: priority,
            empleadoId: '1', // El empleadoId se mantiene siempre como "1"
        };

        try {
            const response = await fetch('http://localhost:8083/tareas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevaTarea),
            });

            if (!response.ok) {
                throw new Error('Error al guardar la tarea');
            }

            const result = await response.text(); 
            setSuccess(result); 
            setTitle('');
            setDescription('');
            setCategory('');
            setStatus('Borrador');
            setTag('');
            setDueDate('');
            setPriority('alta');
        } catch (error) {
            setError('Error al guardar la tarea: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={classes.formContainer}>
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={classes.input}
            />
            <textarea
                placeholder="Descripción"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={classes.textarea}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={classes.select}
            >
                <option value="">Selecciona una categoría</option>
                <option value="Marketing">Marketing</option>
                <option value="Desarrollo">Desarrollo</option>
                <option value="Otros">Otros</option>
            </select>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={classes.select}
            >
                <option value="Borrador">Borrador</option>
                <option value="En desarrollo">En desarrollo</option>
                <option value="Archivada">Archivada</option>
            </select>
            <input
                type="text"
                placeholder="Etiqueta"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className={classes.input}
            />
            <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className={classes.input}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={classes.select}
            >
                <option value="alta">Alta</option>
                <option value="media">Media</option>
                <option value="baja">Baja</option>
            </select>
            <button type="submit" className={classes.button}>Guardar Tarea</button>

            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </form>
    );
}

export default TareasNewForm;
