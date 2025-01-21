import React, { useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import ProjectListComponent from 'components/proyectos/ProjectListComponent';
import ProjectDetailsComponent from 'components/proyectos/ProjetcDetailsComponent';

const useStyles = createUseStyles({
    container: {
        padding: 30,
        background: '#f5f5f5',
        minHeight: '100vh',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    projectList: {
        marginTop: 30,
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        cursor: 'pointer', // Asegura que se vea clicable
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none',
        },
    },
    row: {
        marginTop: 30,
    },
});

function Proyectos() {
    const classes = useStyles();
    const [selectedProject, setSelectedProject] = useState(null);

    // Lista de proyectos de ejemplo
    const projects = [
        { id: 1, name: 'Proyecto A', company: 'Empresa 1', startDate: '2025-01-01', endDate: '2025-06-01', details: 'Desarrollo de una aplicación móvil.' },
        { id: 2, name: 'Proyecto B', company: 'Empresa 2', startDate: '2025-02-15', endDate: '2025-08-15', details: 'Implementación de un sistema ERP.' },
        { id: 3, name: 'Proyecto C', company: 'Empresa 3', startDate: '2025-03-01', endDate: '2025-09-30', details: 'Creación de un sitio web e-commerce.' },
    ];

    const handleSelectProject = (project) => {
        setSelectedProject(project); // Cambia el estado con el proyecto seleccionado
    };

    const handleBackToList = () => {
        setSelectedProject(null); // Vuelve a la lista
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Proyectos</h1>
            {selectedProject ? (
                <ProjectDetailsComponent
                    project={selectedProject}
                    onBack={handleBackToList}
                />
            ) : (
                <>
                    {/* MiniCard para el resumen */}
                    <Row
                        className={classes.row}
                        wrap
                        horizontal="space-between"
                        breakpoints={{ 768: 'column' }}
                    >
                        <MiniCardComponent
                            className={classes.miniCardContainer}
                            title="Total Proyectos"
                            value={projects.length.toString()}
                        />
                    </Row>

                    {/* Lista de proyectos */}
                    <div className={classes.projectList}>
                        <ProjectListComponent
                            projects={projects}
                            onSelect={handleSelectProject} // Prop para seleccionar proyecto
                        />
                    </div>
                </>
            )}
        </div>
    );
}

export default Proyectos;
