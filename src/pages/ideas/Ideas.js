import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import IdeaListComponent from 'components/ideas/IdeasListComponent';
import IdeaDetailsComponent from 'components/ideas/IdeasDetailsComponent';
import IdeasNewForm from 'pages/ideas/IdeasNewForm';

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
    ideaCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 20,
        margin: '10px 0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        color: 'white',
        fontSize: 16,
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
});

function Ideas() {
    const classes = useStyles();
    const [ideas, setIdeas] = useState([]); 
    const [selectedIdea, setSelectedIdea] = useState(null); 
    const [isCreating, setIsCreating] = useState(false); 
    const [filter, setFilter] = useState(''); // Filtro para el estado de las ideas

    useEffect(() => {
        fetch('/api/ideas')
            .then((response) => response.json())
            .then((data) => setIdeas(data))
            .catch((error) => console.error('Error fetching ideas:', error));
    }, []);

    const handleSaveIdea = (newIdea) => {
        setIdeas([...ideas, newIdea]);
        setIsCreating(false); // Vuelve a la lista de ideas
    };

    // Filtra las ideas según el estado
    const filteredIdeas = filter
        ? ideas.filter((idea) => idea.status === filter)
        : ideas;

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Ideas</h1>

            {isCreating ? (
                <IdeasNewForm onSave={handleSaveIdea} />
            ) : selectedIdea ? (
                <IdeaDetailsComponent
                    idea={selectedIdea}
                    onBack={() => setSelectedIdea(null)} // Vuelve a la lista de ideas
                />
            ) : (
                <>
                    <Row className={classes.ideaRow} horizontal="center">
                        <MiniCardComponent
                            className={classes.miniCardContainer}
                            title="Total Ideas"
                            value={ideas.length.toString()}
                        />
                    </Row>

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
                    
                    </div>

                    <IdeaListComponent
                        ideas={filteredIdeas} // Pasa las ideas filtradas
                        onSelect={(idea) => setSelectedIdea(idea)}
                    />

                    <div className={classes.buttonContainer}>
                        <button
                            className={classes.newIdeaButton}
                            onClick={() => setIsCreating(true)} // Activa la creación de nueva idea
                        >
                            +
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
export default Ideas;

