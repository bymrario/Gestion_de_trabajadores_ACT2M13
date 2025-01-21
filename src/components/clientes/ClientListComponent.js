import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Para permitir la navegación a los detalles de un cliente

function ClientListComponent() {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        // Hacemos la petición GET a la API para obtener la lista de clientes
        axios.get('http://localhost:3000/api/clients')
            .then(response => {
                setClients(response.data); // Guardamos los datos de los clientes en el estado
            })
            .catch(error => {
                console.error('Error al obtener los clientes:', error);
            });
    }, []);

    return (
        <div>
            <h3>Lista de Clientes</h3>
            <ul>
                {clients.map(client => (
                    <li key={client._id}>
                        <Link to={`/clients/${client._id}`}>
                            <strong>{client.name}</strong> ({client.industry}) - Proyectos: {client.projects}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ClientListComponent;
