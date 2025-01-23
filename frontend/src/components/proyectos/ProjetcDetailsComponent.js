import React from 'react';
import { createUseStyles } from 'react-jss';
import { Column, Row } from 'simple-flexbox';

const useStyles = createUseStyles({
    container: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 20,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: 600,
        margin: '0 auto',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    detailRow: {
        marginBottom: 10,
    },
    label: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    backButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#6a11cb',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#2575fc',
        },
    },
});

function ProjectDetailsComponent({ project, onBack }) {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>Detalles del Proyecto</h2>
            <Row className={classes.detailRow}>
                <span className={classes.label}>Nombre:</span>
                <span>{project.name}</span>
            </Row>
            <Row className={classes.detailRow}>
                <span className={classes.label}>Empresa:</span>
                <span>{project.company}</span>
            </Row>
            <Row className={classes.detailRow}>
                <span className={classes.label}>Fecha de Inicio:</span>
                <span>{project.startDate}</span>
            </Row>
            <Row className={classes.detailRow}>
                <span className={classes.label}>Fecha de Finalización:</span>
                <span>{project.endDate}</span>
            </Row>
            <Row className={classes.detailRow}>
                <span className={classes.label}>Detalles:</span>
                <span>{project.details}</span>
            </Row>
            <button className={classes.backButton} onClick={onBack}>
                Volver a la Lista
            </button>
        </div>
    );
}

export default ProjectDetailsComponent;
