import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';

const useStyles = createUseStyles({
    row: {
        marginTop: 30,
        flexWrap: 'wrap',
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
});

function ProjectListComponent({ projects, onSelect }) {
    const classes = useStyles();

    return (
        <Row
            className={classes.row}
            horizontal="space-between"
            breakpoints={{ 768: 'column' }}
        >
            {projects.map((project) => (
                <MiniCardComponent
                    key={project.id}
                    className={classes.miniCardContainer}
                    title={project.name}
                    value={` ${project.company}`}
                    onClick={() => onSelect(project)} // Selección del proyecto
                />
            ))}
        </Row>
    );
}

export default ProjectListComponent;
