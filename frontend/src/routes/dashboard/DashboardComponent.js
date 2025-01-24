import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import LastProyectsComponent from './LastProyects';
import PendignProyectsComponent from './PendingProyects';
import TasksComponent from './TasksComponent';
import api from 'services/api';

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
    lastProyects: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    pendingProyects: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});

function DashboardComponent() {
    const classes = useStyles();
    const [clientesCount, setClientesCount] = useState(0);
    const [contactosCount, setContactosCount] = useState(0);
    const [proyectosActivosCount, setProyectosActivosCount] = useState(0);
    const [proyectosFinalizadosCount, setProyectosFinalizadosCount] = useState(0);
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

        // Función para obtener los contactos
        const fetchContactos = async () => {
            try {
                const response = await api.get('/contactos');
                setContactosCount(response.data.length); 
            } catch (error) {
                console.error('Error al obtener los contactos:', error);
            }
        };

        // Función para obtener proyectos activos
        const fetchProyectosActivos = async () => {
            try {
                const response = await api.get('/proyectos');
                setProyectosActivosCount(response.data.length);
            } catch (error) {
                console.error('Error al obtener los proyectos activos:', error);
            }
        };

        // Función para obtener proyectos finalizados
        const fetchProyectosFinalizados = async () => {
            try {
                const response = await api.get('/proyectos');
                const proyectos = response.data;

                // Filtramos los proyectos finalizados
                const proyectosFinalizados = proyectos.filter(proyecto => {
                    const fechaVencimiento = new Date(proyecto.fechaVencimiento); // Convertir a Date
                    const fechaActual = new Date(); // Obtener la fecha actual

                    return fechaVencimiento < fechaActual; // Verificamos si la fechaVencimiento es menor que la fecha actual
                });

                setProyectosFinalizadosCount(proyectosFinalizados.length); // Contamos los proyectos finalizados
            } catch (error) {
                console.error('Error al obtener los proyectos finalizados:', error);
            }
        };

        // Llamamos a todas las funciones
        fetchClientes();
        fetchContactos();
        fetchProyectosActivos();
        fetchProyectosFinalizados();
    }, []);

    // if (loading) return <div>Cargando proyectos...</div>;  
    if (error) return <div>{error}</div>; 

    return (
        <Column>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Proyectos Activos'
                        value={proyectosActivosCount}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Clientes'
                        value={clientesCount}
                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Contactos'
                        value={contactosCount}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Proyectos Finalizados'
                        value={proyectosFinalizadosCount}
                    />
                </Row>
            </Row>
            <div className={classes.lastProyects}>
                <LastProyectsComponent/>
            </div>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 1024: 'column' }}
            >
                <PendignProyectsComponent containerStyles={classes.pendingProyects} />
                <TasksComponent containerStyles={classes.tasks} />
            </Row>
        </Column>
    );
}

export default DashboardComponent;
