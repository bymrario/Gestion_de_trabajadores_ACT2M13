import React from 'react';

function IdeaDetailsComponent({ idea, onBack }) {
    return (
        <div>
            <button onClick={onBack}>Volver</button>
            <h1>{idea.title}</h1>
            <p><strong>Categoría:</strong> {idea.category}</p>
            <p><strong>Descripción:</strong> {idea.description}</p>
            <p><strong>Estado:</strong> {idea.status}</p>
            <p><strong>Fecha de creación:</strong> {idea.date}</p>
        </div>
    );
}

export default IdeaDetailsComponent;
