import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';

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
            subtitle='Grupo:'
            subtitleTwo='Soporte'
            items={[
                renderStat('Proyecto pendiente 1', "€ 4238"),
                renderStat('Proyecto pendiente 2', "€ 1005"),
                renderStat('Proyecto pendiente 3', "€ 914"),
                renderStat('Proyecto pendiente 4', "€ 281")
            ]}
        />
    );
}

export default PendignProyectsComponent;
