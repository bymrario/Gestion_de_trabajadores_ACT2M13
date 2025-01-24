import React, { useEffect, useState } from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import api from 'services/api';

const useStyles = createUseStyles((theme) => ({
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    }
}));

function PendignProyectsComponent({ containerStyles }) {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [proyectosPendientes, setProyectosPendientes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getTodayDate = () => {
        const today = new Date();
        return today.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    useEffect(() => {
        // Llamada al backend para obtener los proyectos pendientes
        const fetchProyectosPendientes = async () => {
            try {
                const response = await api.get('/proyectos');  
                setProyectosPendientes(response.data); 
            } catch (err) {
                setError('Error al obtener proyectos pendientes');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProyectosPendientes();
    }, []); 

    function renderStat(title, value) {
        return (
            <Row horizontal='space-between' vertical='center'>
                <span className={classes.itemTitle}>{title}</span>
                <span className={[classes.itemTitle, classes.itemValue].join(' ')}>{value}</span>
            </Row>
        );
    }

    return (
        <CardComponent
            containerStyles={containerStyles}
            title='Proyectos pendientes'
            link='Ver detalles'
            subtitle='Hoy es :'
            subtitleTwo={getTodayDate()}
            items={proyectosPendientes.map((proyecto, index) =>
                renderStat(proyecto.nombre, `€ ${proyecto.precio}`)
            )}
        />
    );
}

export default PendignProyectsComponent;
