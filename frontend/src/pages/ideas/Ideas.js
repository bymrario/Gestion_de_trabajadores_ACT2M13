import React, { useState, useEffect } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import IdeasNewForm from 'pages/ideas/IdeasNewForm';
import { Link } from 'react-router-dom';
import SLUGS from 'resources/slugs';

const useStyles = createUseStyles({
    container: {
        padding: 30,
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color: 'white',
        minHeight: '100vh',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ideaRow: {
        marginTop: 20,
        '@media (max-width: 768px)': {
            flexDirection: 'column',
        },
    },
    miniCardContainer: {
        flexGrow: 1,
        margin: '0 15px',
        '@media (max-width: 768px)': {
            margin: '15px 0',
        },
    },
    newIdeaButton: {
        margin: '20px auto',
        padding: '10px 20px',
        backgroundColor: '#2575fc',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        fontSize: '30px',
        '&:hover': {
            backgroundColor: '#93C572',
        },
    },
    ideaCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 20,
        margin: '10px 0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        color: 'white',
        fontSize: 16,
    },
    filterContainer: {
        textAlign: 'center',
        marginTop: '20px',
    },
    filterButton: {
        backgroundColor: '#5A67D8',
        color: 'white',
        padding: '10px 20px',
        margin: '0 5px',
        fontSize: '16px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
    },
    listContainer: {
        marginTop: '30px',
    },
    successMessage: {
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '18px',
        color: 'green',
    },
    linkButton: {
        padding: '10px 20px',
        backgroundColor: '#2575fc',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        fontSize: '18px',
        '&:hover': {
            backgroundColor: '#93C572',
        },
    },
    // Estilos para el botón fijo
    fixedButtonContainer: {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
    },
});

function Ideas() {
    const classes = useStyles();
    const [ideas, setIdeas] = useState([]); // Lista de ideas
    const [isCreating, setIsCreating] = useState(false); // Controla si se está creando una nueva idea
    const [filter, setFilter] = useState(''); // Filtro para el estado de las ideas
    const [error, setError] = useState(''); // Manejo de errores
    const [successMessage, setSuccessMessage] = useState(''); // Mensaje de éxito

    useEffect(() => {
        // Llamada inicial para obtener las ideas
        fetch('http://localhost:8083/notas')
            .then((response) => response.json())
            .then((data) => setIdeas(data))
            .catch((error) => setError('Error al cargar las ideas: ' + error.message));
    }, []);

    const handleSaveIdea = (newIdea) => {
        fetch('http://localhost:8083/notas', {
            method: 'POST',
            body: JSON.stringify(newIdea),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setSuccessMessage(`Nota creada con éxito. ID: ${data.id}`);
                setIdeas([...ideas, data]); // Actualiza la lista con la nueva idea
                setIsCreating(false); // Cierra el formulario
            })
            .catch((error) => {
                setError('Error al crear la idea: ' + error.message);
            });
    };

    const filteredIdeas = filter
        ? ideas.filter((idea) => idea.estado === filter)
        : ideas;

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Ideas</h1>

            {/* Botón fijo para volver al listado */}
            <div className={classes.fixedButtonContainer}>
                <Link to={SLUGS.ideasTwo} className={classes.linkButton} onClick={() => window.location.reload()}>
                    Actualizar listado
                </Link>
            </div>

            <Row className={classes.ideaRow} horizontal="center">
                <MiniCardComponent
                    className={classes.miniCardContainer}
                    title="Total Ideas"
                    value={ideas.length.toString()}
                />
            </Row>

            {isCreating ? (
                <IdeasNewForm onSave={handleSaveIdea} />
            ) : (
                <>
                    <div className={classes.filterContainer}>
                        <button
                            className={classes.filterButton}
                            onClick={() => setFilter('Borrador')}
                        >
                            Borrador
                        </button>
                        <button
                            className={classes.filterButton}
                            onClick={() => setFilter('En desarrollo')}
                        >
                            En desarrollo
                        </button>
                        <button
                            className={classes.filterButton}
                            onClick={() => setFilter('Archivada')}
                        >
                            Archivada
                        </button>
                        <button
                            className={classes.filterButton}
                            onClick={() => setFilter('')}
                        >
                            Todas
                        </button>
                    </div>

                    <div className={classes.listContainer}>
                        {filteredIdeas.length > 0 ? (
                            filteredIdeas.map((idea, index) => (
                                <div key={index} className={classes.ideaCard}>
                                    <h3>{idea.titulo}</h3>
                                    <p>{idea.contenido}</p>
                                    <p>
                                        <strong>Categoría:</strong> {idea.categoria}
                                    </p>
                                    <p>
                                        <strong>Estado:</strong> {idea.estado}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p style={{ textAlign: 'center' }}>No hay ideas disponibles.</p>
                        )}
                    </div>

                    <div className={classes.buttonContainer}>
                        <button
                            className={classes.newIdeaButton}
                            onClick={() => setIsCreating(true)}
                        >
                            +
                        </button>
                    </div>
                </>
            )}

            {/* Muestra el mensaje de éxito o error */}
            {(successMessage || error) && (
                <div className={classes.successMessage}>
                    <p>{successMessage || error}</p>
                </div>
            )}
        </div>
    );
}

export default Ideas;
