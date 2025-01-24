import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Para permitir la navegación a los detalles de un cliente
import api from 'services/api';

function ClientListComponent() {
    const [clients, setClients] = useState([]);
    const [clientesCount, setClientesCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Función para obtener los clientes
        const fetchClientes = async () => {
            try {
                const response = await api.get('/clientes');
                setClientesCount(response.data.length); 
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        };
 
        fetchClientes();
    }, []);

    // if (loading) return <div>Cargando proyectos...</div>;  
    if (error) return <div>{error}</div>; 

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
