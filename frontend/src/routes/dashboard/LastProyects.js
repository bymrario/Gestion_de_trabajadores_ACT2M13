import React, { useEffect, useState } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import LineChart from 'react-svg-line-chart';
import api from 'services/api';

const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        cursor: 'pointer'
    },
    graphContainer: {
        marginTop: 24,
        marginLeft: 0,
        marginRight: 0,
        width: '100%'
    },
    graphSection: {
        padding: 24
    },
    graphSubtitle: {
        ...theme.typography.smallSubtitle,
        color: theme.color.grayishBlue2,
        marginTop: 4,
        marginRight: 8
    },
    graphTitle: {
        ...theme.typography.cardTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    statContainer: {
        borderBottom: `1px solid ${theme.color.lightGrayishBlue2}`,
        padding: '24px 32px 24px 32px',
        height: 'calc(114px - 48px)',
        '&:last-child': {
            border: 'none'
        }
    },
    stats: {
        borderTop: `1px solid ${theme.color.lightGrayishBlue2}`,
        width: '100%'
    },
    statTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '22px',
        letterSpacing: '0.3px',
        textAlign: 'center',
        color: theme.color.grayishBlue2,
        whiteSpace: 'nowrap',
        marginBottom: 6
    },
    statValue: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.color.veryDarkGrayishBlue
    }
}));

function LastProyectsComponent() {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [proyectos, setProyectos] = useState([]);
    const [stats, setStats] = useState({
        pendientes: 0,
        activos: 0,
        finalizados: 0,
        tiempoTotal: 0,
        resueltos: '0%'
    });
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProyectos = async () => {
            try {
                const response = await api.get('/proyectos');
                console.log('Datos recibidos:', response.data);
                const proyectosData = response.data;

                // Calcular estadísticas
                const pendientes = proyectosData.filter(p => p.estado.toLowerCase() === 'pendiente').length;
                const activos = proyectosData.filter(p => p.estado.toLowerCase() === 'activo').length;
                const finalizados = proyectosData.filter(p => p.estado.toLowerCase() === 'finalizado').length;

                const tiempoTotal = proyectosData.reduce((total, p) => {
                    if (p.fechaCreacion && p.fechaVencimiento) {
                        const fechaCreacion = new Date(p.fechaCreacion);
                        const fechaVencimiento = new Date(p.fechaVencimiento);
                        const diffHoras = (fechaVencimiento - fechaCreacion) / (1000 * 60 * 60); // Convertir a horas
                        return total + diffHoras;
                    }
                    return total;
                }, 0);

                const totalProyectos = pendientes + activos + finalizados;
                const resueltos =
                    totalProyectos > 0 ? `${((finalizados / totalProyectos) * 100).toFixed(2)}%` : '0%';

                // Calcular datos para el gráfico
                const datosGrafico = proyectosData.map((p, index) => {
                    let tiempo = 0;
                    if (p.fechaCreacion && p.fechaVencimiento) {
                        const fechaCreacion = new Date(p.fechaCreacion);
                        const fechaVencimiento = new Date(p.fechaVencimiento);
                        tiempo = (fechaVencimiento - fechaCreacion) / (1000 * 60 * 60); // Convertir a horas
                    }
                    return { x: index + 1, y: parseFloat(tiempo.toFixed(2)) }; // Index para eje X
                });

                setStats({
                    pendientes,
                    activos,
                    finalizados,
                    tiempoTotal: tiempoTotal.toFixed(2),
                    resueltos
                });
                setProyectos(proyectosData);
                setChartData(datosGrafico);
            } catch (err) {
                setError('Error al obtener proyectos');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProyectos();
    }, []);

    function renderStat(title, value) {
        return (
            <Column
                flexGrow={1}
                className={classes.statContainer}
                vertical='center'
                horizontal='center'
            >
                <span className={classes.statTitle}>{title}</span>
                <span className={classes.statValue}>{value}</span>
            </Column>
        );
    }

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Row
            flexGrow={1}
            className={classes.container}
            horizontal='center'
            breakpoints={{ 1024: 'column' }}
        >
            <Column
                wrap
                flexGrow={7}
                flexBasis='735px'
                className={classes.graphSection}
                breakpoints={{ 1024: { width: 'calc(100% - 48px)', flexBasis: 'auto' } }}
            >
                <Row wrap horizontal='space-between'>
                    <Column>
                        <span className={classes.graphTitle}>Últimos proyectos</span>
                        <span className={classes.graphSubtitle}>Estadísticas generales</span>
                    </Column>
                </Row>
                <div className={classes.graphContainer}>
                    <LineChart
                        data={chartData}
                        viewBoxWidth={500}
                        pointsStrokeColor={theme.color.lightBlue}
                        areaColor={theme.color.lightBlue}
                        areaVisible={true}
                    />
                </div>
            </Column>
            <Column className={classes.separator} breakpoints={{ 1024: { display: 'none' } }}>
                <div />
            </Column>
            <Column flexGrow={3} flexBasis='342px' breakpoints={{ 1024: classes.stats }}>
                {renderStat('Pendientes', stats.pendientes)}
                {renderStat('Activos', stats.activos)}
                {renderStat('Finalizados', stats.finalizados)}
                {renderStat('Tiempo Total (h)', stats.tiempoTotal)}
                {renderStat('Resueltos', stats.resueltos)}
            </Column>
        </Row>
    );
}

export default LastProyectsComponent;
