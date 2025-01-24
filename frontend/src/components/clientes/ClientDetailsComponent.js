import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

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
    }, [clientId]);

    if (!clientDetails) {
        return <p>Cargando detalles del cliente...</p>; 
    }

    // Mostrar detalles del cliente con los datos correctos
    return (
        <div>
            <h3>Detalles del Cliente: {clientDetails.nombreCliente}</h3>
            <p><strong>Correo:</strong> {clientDetails.correo}</p>
            <p><strong>Rol:</strong> {clientDetails.rol}</p>
            <p><strong>Estado:</strong> {clientDetails.activo ? 'Activo' : 'Inactivo'}</p>
        </div>
    );
}

export default ClientDetailsComponent;
