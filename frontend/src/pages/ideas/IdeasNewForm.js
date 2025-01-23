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

function IdeasNewForm({ onSave }) {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('Borrador'); // Estado de la idea

    const handleSubmit = () => {
        onSave({
            id: Date.now(),
            title,
            description,
            category,
            status,
            date: new Date().toISOString(),
        });
        setTitle('');
        setDescription('');
        setCategory('');
        setStatus('Borrador');
    };

    return (
        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={classes.formContainer}>
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
            <button type="submit" className={classes.button}>Guardar Idea</button>
        </form>
    );
}

export default IdeasNewForm;
