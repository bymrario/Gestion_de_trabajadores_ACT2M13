import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import LastProyectsComponent from './LastProyects';
import PendignProyectsComponent from './PendingProyects';
import TasksComponent from './TasksComponent';

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
                        value='12'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Clientes'
                        value='16'
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
                        value='43'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Proyectos Finalizados'
                        value='64'
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
