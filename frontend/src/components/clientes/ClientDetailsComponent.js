import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Para obtener el parámetro de la URL

function ClientDetailsComponent() {
    const { clientId } = useParams(); // Obtener el ID del cliente desde la URL
    const [clientDetails, setClientDetails] = useState(null);

    useEffect(() => {
        // Hacemos una solicitud GET para obtener los detalles de un cliente específico
        axios.get(`http://localhost:3000/api/clients/${clientId}`)
            .then(response => {
                setClientDetails(response.data); // Guardamos los detalles del cliente
            })
            .catch(error => {
                console.error('Error al obtener los detalles del cliente:', error);
            });
    }, [clientId]); // Este efecto se ejecuta cada vez que cambia el clientId

    if (!clientDetails) {
        return <p>Cargando detalles del cliente...</p>; // Muestra un mensaje mientras se cargan los detalles
    }

    return (
        <div>
            <h3>Detalles del Cliente: {clientDetails.name}</h3>
            <p><strong>Industria:</strong> {clientDetails.industry}</p>
            <p><strong>Proyectos:</strong> {clientDetails.projects}</p>
            
        </div>
    );
}

export default ClientDetailsComponent;
