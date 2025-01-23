import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ContactDetailsComponent() {
    const { contactId } = useParams(); // Obtener el ID de contacto desde la URL
    const [contact, setContact] = useState(null);

    useEffect(() => {
        // Llamada a la API para obtener los detalles del contacto
        fetch(`/api/contacts/${contactId}`)
            .then((response) => response.json())
            .then((data) => setContact(data))
            .catch((error) => console.error('Error fetching contact:', error));
    }, [contactId]);

    return (
        <div>
            {contact ? (
                <>
                    <h2>Detalles de Contacto</h2>
                    <p><strong>Nombre:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Teléfono:</strong> {contact.phone}</p>
                </>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default ContactDetailsComponent;
