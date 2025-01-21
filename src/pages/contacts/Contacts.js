import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import ContactListComponent from 'components/contacts/ContactListComponent'; 
import ContactDetailsComponent from 'components/contacts/ContactDetailsComponent';

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
    contactCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        padding: 20,
        margin: '10px 0',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        color: 'white',
        fontSize: 16,
    },
    contactRow: {
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
});

function Contacts() {
    const classes = useStyles(); // Aplicar los estilos definidos.
    const [contacts, setContacts] = useState([]); // Inicializa el estado para los contactos.

    // Cargar los contactos desde la API cuando el componente se monta
    useEffect(() => {
        // Llamada a la API para obtener los contactos
        fetch('/api/contacts') // Cambia la URL a la de tu API
            .then((response) => response.json())
            .then((data) => setContacts(data)) // Actualiza el estado con los datos obtenidos
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []); // El array vacío asegura que la llamada solo se haga una vez al montar el componente.

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Contactos</h1>

            <ContactListComponent contacts={contacts} />

            <Row className={classes.contactRow} horizontal="center">
                <MiniCardComponent
                    className={classes.miniCardContainer}
                    title="Total Contactos"
                    value={contacts.length.toString()}
                />
            </Row>

            {contacts.length > 0 && <ContactDetailsComponent contact={contacts[0]} />}
        </div>
    );
}

export default Contacts;

