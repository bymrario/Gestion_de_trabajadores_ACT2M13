import React, { useEffect, useState } from 'react';

function ContactListComponent() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        // Aquí harías la llamada a tu API para obtener los contactos
        fetch('/api/contacts')
            .then((response) => response.json())
            .then((data) => setContacts(data))
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    return (
        <div>
            <h2>Lista de Contactos</h2>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact.id}>
                        {contact.name} - {contact.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContactListComponent;
