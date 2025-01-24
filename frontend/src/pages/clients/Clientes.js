import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import api from 'services/api';  // Asegúrate de que el servicio api esté configurado correctamente
import MiniCardComponent from 'components/cards/MiniCardComponent';  
import ClientListComponent from 'components/clientes/ClientListComponent';  
import ClientDetailsComponent from 'components/clientes/ClientDetailsComponent';  

const useStyles = createUseStyles({
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    clientList: {
        marginTop: 30
    },
    clientRow: {
        marginTop: 30
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: 20,
    },
    tableHeader: {
        backgroundColor: '#f4f4f4',
        fontWeight: 'bold',
        padding: '10px 0',
    },
    tableCell: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    tableRow: {
        '&:nth-child(even)': {
            backgroundColor: '#f9f9f9',
        },
        '&:hover': {
            backgroundColor: '#f1f1f1',
        }
    }
});

function Clients() {
    const classes = useStyles();
    const [clients, setClients] = useState([]);
    const [activeClientsCount, setActiveClientsCount] = useState(0);
    const [inactiveClientsCount, setInactiveClientsCount] = useState(0);
    const [totalClientsCount, setTotalClientsCount] = useState(0);

    useEffect(() => {
        // Realizar la solicitud GET para obtener los clientes
        const fetchClients = async () => {
            try {
                const response = await api.get('/clientes');  // Asegúrate de que esta URL esté bien configurada
                const fetchedClients = response.data;
                setClients(fetchedClients);

                // Contar clientes activos, inactivos y el total
                const activeClients = fetchedClients.filter(client => client.activo).length;
                const inactiveClients = fetchedClients.filter(client => !client.activo).length;
                setActiveClientsCount(activeClients);
                setInactiveClientsCount(inactiveClients);
                setTotalClientsCount(fetchedClients.length);
            } catch (error) {
                console.error('Error al obtener los clientes:', error);
            }
        };

        fetchClients();
    }, []);

    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal="space-between"
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal="space-between"
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title="Clientes Activos"
                        value={activeClientsCount}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title="Clientes Inactivos"
                        value={inactiveClientsCount}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title="Total Clientes"
                        value={totalClientsCount}
                    />
                </Row>
            </Row>

            {/* Lista de clientes */}
            <div className={classes.clientList}>
                {/* Tabla de clientes */}
                <table className={classes.table}>
                    <thead>
                        <tr className={classes.tableHeader}>
                            <th className={classes.tableCell}>ID</th>
                            <th className={classes.tableCell}>Nombre</th>
                            <th className={classes.tableCell}>Correo</th>
                            <th className={classes.tableCell}>Rol</th>
                            <th className={classes.tableCell}>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} className={classes.tableRow}>
                                <td className={classes.tableCell}>{client.id}</td>
                                <td className={classes.tableCell}>{client.nombreCliente}</td>
                                <td className={classes.tableCell}>{client.correo}</td>
                                <td className={classes.tableCell}>{client.rol}</td>
                                <td className={classes.tableCell}>
                                    {client.activo ? 'Activo' : 'Inactivo'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Detalles de un cliente */}
            {/* <Row
                horizontal="space-between"
                className={classes.clientRow}
                breakpoints={{ 1024: 'column' }}
            >
                <ClientDetailsComponent />
            </Row> */}
        </Column>
    );
}

export default Clients;
