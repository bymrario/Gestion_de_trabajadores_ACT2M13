import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from 'services/api';

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
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 20,
        margin: '10px 0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        color: 'white',
        fontSize: 16,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    table: {
        width: '100%',
        marginTop: 20,
        borderCollapse: 'collapse',
    },
    th: {
        padding: '8px',
        border: '1px solid #ddd',
        textAlign: 'left',
    },
    td: {
        padding: '8px',
        border: '1px solid #ddd',
    },
    active: {
        color: 'green',
    },
    inactive: {
        color: 'red',
    },
});

function Contacts() {
    const classes = useStyles();
    const [contacts, setContacts] = useState([]);
    const [activeContactsCount, setActiveContactsCount] = useState(0);
    const [inactiveContactsCount, setInactiveContactsCount] = useState(0);
    const [totalContactsCount, setTotalContactsCount] = useState(0);

   
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await api.get('/contactos'); 
                const fetchedContacts = response.data;
                setContacts(fetchedContacts);

                // Contar contactos activos, inactivos y el total
                const activeContacts = fetchedContacts.filter(contact => contact.activo).length;
                const inactiveContacts = fetchedContacts.filter(contact => !contact.activo).length;
                setActiveContactsCount(activeContacts);
                setInactiveContactsCount(inactiveContacts);
                setTotalContactsCount(fetchedContacts.length);
            } catch (error) {
                console.error('Error al obtener los contactos:', error);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Contactos</h1>

            {/* Tarjeta con el total de contactos */}
            <div className={classes.card}>
                <h3>Total Contactos</h3>
                <span>{totalContactsCount}</span>
            </div>

            {/* Tabla con el listado de contactos */}
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.th}>Nombre</th>
                        <th className={classes.th}>Correo</th>
                        <th className={classes.th}>Rol</th>
                        <th className={classes.th}>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contact, index) => (
                        <tr key={index}>
                            <td className={classes.td}>{contact.nombreContacto}</td>
                            <td className={classes.td}>{contact.correo}</td>
                            <td className={classes.td}>{contact.rol}</td>
                            <td className={classes.td}>
                                <span className={contact.activo ? classes.active : classes.inactive}>
                                    {contact.activo ? 'Activo' : 'Inactivo'}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Contacts;
