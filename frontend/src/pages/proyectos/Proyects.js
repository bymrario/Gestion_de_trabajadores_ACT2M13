import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import api from 'services/api';

const useStyles = createUseStyles({
    container: {
        padding: '30px',
        background: '#f5f5f5',
        minHeight: '100vh',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginBottom: '20px',
    },
    th: {
        background: '#007bff',
        color: '#fff',
        padding: '10px',
        textAlign: 'left',
        fontWeight: 'bold',
    },
    td: {
        padding: '10px',
        borderBottom: '1px solid #ddd',
    },
    card: {
        marginTop: '20px',
        padding: '15px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    cardTitle: {
        marginBottom: '15px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: '#333',
    },
    cardText: {
        marginBottom: '10px',
    },
    button: {
        marginTop: '10px',
        padding: '10px 20px',
        background: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        '&:hover': {
            background: '#0056b3',
        },
    },
});

function Proyectos() {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/proyectos'); 
                setProjects(response.data);
            } catch (error) {
                console.error('Error al obtener los proyectos:', error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Lista de Proyectos</h1>

            {selectedProject ? (
                <div className={classes.card}>
                    <h2 className={classes.cardTitle}>Detalles del Proyecto</h2>
                    <p className={classes.cardText}><strong>Nombre:</strong> {selectedProject.nombre}</p>
                    <p className={classes.cardText}><strong>Descripción:</strong> {selectedProject.descripcion}</p>
                    <p className={classes.cardText}><strong>Estado:</strong> {selectedProject.estado}</p>
                    <p className={classes.cardText}><strong>Prioridad:</strong> {selectedProject.prioridad}</p>
                    <p className={classes.cardText}><strong>Fecha de Creación:</strong> {selectedProject.fechaCreacion}</p>
                    <p className={classes.cardText}><strong>Fecha de Vencimiento:</strong> {selectedProject.fechaVencimiento}</p>
                    <p className={classes.cardText}><strong>Etiqueta:</strong> {selectedProject.etiqueta}</p>
                    <p className={classes.cardText}><strong>Precio:</strong> ${selectedProject.precio}</p>
                    <p className={classes.cardText}><strong>Kanban:</strong> {selectedProject.kanban ? 'Sí' : 'No'}</p>
                    <button
                        className={classes.button}
                        onClick={() => setSelectedProject(null)}
                    >
                        Volver a la lista
                    </button>
                </div>
            ) : (
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.th}>Nombre</th>
                            <th className={classes.th}>Empresa</th>
                            <th className={classes.th}>Estado</th>
                            <th className={classes.th}>Prioridad</th>
                            <th className={classes.th}>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr key={project.id}>
                                <td className={classes.td}>{project.nombre}</td>
                                <td className={classes.td}>{project.empresa}</td>
                                <td className={classes.td}>{project.estado}</td>
                                <td className={classes.td}>{project.prioridad}</td>
                                <td className={classes.td}>
                                    <button
                                        className={classes.button}
                                        onClick={() => setSelectedProject(project)}
                                    >
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Proyectos;
