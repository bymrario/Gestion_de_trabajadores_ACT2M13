import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
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
});

function Clients() {
    const classes = useStyles();
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
                        value="45"
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title="Proyectos Asignados"
                        value="15"
                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal="space-between"
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title="Clientes Nuevos"
                        value="5"
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title="Proyectos Completados"
                        value="10"
                    />
                </Row>
            </Row>

            {/* Lista de clientes */}
            <div className={classes.clientList}>
                <ClientListComponent />
            </div>

            {/* Detalles de un cliente */}
            <Row
                horizontal="space-between"
                className={classes.clientRow}
                breakpoints={{ 1024: 'column' }}
            >
                <ClientDetailsComponent />
            </Row>
        </Column>
    );
}

export default Clients;
