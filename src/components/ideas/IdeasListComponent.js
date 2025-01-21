
import React from 'react';
import { Row, Column } from 'simple-flexbox';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import routes from 'routes'; // Importamos las rutas

function IdeaListComponent({ ideas, onSelect }) {
    return (
        <Column>
            <h2>Mis Ideas</h2>
            <Row wrap horizontal="space-between">
                {ideas.map((idea) => (
                    <MiniCardComponent
                        key={idea.id}
                        title={idea.title}
                        value={idea.category}
                        onClick={() => onSelect(routes.ideaDetail(idea.id))} // Llamamos a la función onSelect y pasamos la ruta
                    />
                ))}
            </Row>
        </Column>
    );
}

export default IdeaListComponent;
