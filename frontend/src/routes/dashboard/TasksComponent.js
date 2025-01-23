import React, { useEffect, useState } from "react";
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { IconCheckboxOn, IconCheckboxOff } from '../../assets/icons';
import CardComponent from 'components/cards/CardComponent';
import CreateTaskModal from "components/tareas/CreateTask";
import api from 'services/api';

const useStyles = createUseStyles((theme) => ({
    addButton: {
        backgroundColor: theme.color.lightGrayishBlue,
        color: theme.color.grayishBlue2,
        fontSize: '20px !important',
        padding: '7px !important'
    },
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    },
    greyTitle: {
        color: theme.color.grayishBlue3
    },
    tagStyles: {
        borderRadius: 5,
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: 11,
        letterSpacing: '0.5px',
        lineHeight: '14px',
        padding: '5px 12px 5px 12px'
    },
    checkboxWrapper: {
        cursor: 'pointer',
        marginRight: 16
    }
}));


const TAGS = {
    ALTA: { text: 'ALTA', backgroundColor: '#F44336', color: '#FFFFFF' },  
    MEDIA: { text: 'MEDIA', backgroundColor: '#FF9800', color: '#FFFFFF' }, 
    BAJA: { text: 'BAJA', backgroundColor: '#4CAF50', color: '#FFFFFF' }  
};

function TasksComponent(props) {
    const [tasks, setTasks] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);  
    const [newTaskData, setNewTaskData] = useState(null); 
    const theme = useTheme();
    const classes = useStyles({ theme });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get("/tareas", {
                    params: { empleadoId: 1 }
                });
                setTasks(response.data); // Guarda las tareas en el estado
            } catch (error) {
                console.error("Error al obtener las tareas:", error);
                setError("Error al cargar las tareas");
            } finally {
                setLoading(false); // Finaliza el estado de carga
            }
        };
    
        fetchTasks();
      }, []);

    function onCheckboxClick(index) {
        setTasks((prev) => {
            const newItems = [...prev];
            newItems[index].checked = newItems[index].checked ? false : true;
            return newItems;
        });
    }

    function getNextTag(current = 'ALTA') {
        const tagLabels = ['ALTA', 'MEDIA', 'BAJA'];
        const tagIndex = (tagLabels.indexOf(current) + 1) % 3;
        return TAGS[tagLabels[tagIndex]];
    }


    function onTagClick(index) {
        setTasks((prev) => {
            const newItems = [...prev];
            const currentPriority = newItems[index].prioridad || 'ALTA';  // Asumimos 'ALTA' por defecto
            newItems[index].prioridad = getNextTag(currentPriority).text;
            newItems[index].tag = getNextTag(currentPriority);
            return newItems;
        });
    }


    function onAddButtonClick() {
        setTasks((prev) => {
            const newItems = [...prev];
            newItems.push({
                titulo: `Tarea ${newItems.length + 1}`,
                checked: false,
                prioridad: 'ALTA',  // Inicia con 'ALTA'
                tag: TAGS['ALTA']
            });
            return newItems;
        });
    }

    function renderAddButton() {
        return (
            <Row
                horizontal='center'
                vertical='center'
                className={[classes.tagStyles, classes.addButton].join(' ')}
                onClick={onAddButtonClick}
            >
                +
            </Row>
        );
    }

    const handleCreateTask = async (taskData) => {
        try {
            const response = await api.post("/tareas", taskData); // Enviar tarea al backend
            setTasks((prevTasks) => [...prevTasks, { ...taskData, id: response.data.id }]); // Añadir tarea a la lista
            setShowCreateTaskModal(false);  // Cerrar modal
        } catch (error) {
            console.error("Error al crear la tarea:", error);
            setError("Error al crear la tarea");
        }
    };

    const handleOpenModal = () => {
        setShowCreateTaskModal(true);  // Abrir el modal
    };

    const handleCloseModal = () => {
        setShowCreateTaskModal(false);  // Cerrar el modal
    };

    if (loading) return <div>Cargando tareas...</div>;
    if (error) return <div>{error}</div>;

    return (
        <CardComponent
            containerStyles={props.containerStyles}
            title="Tareas"
            link="Ver todas"
            subtitle="Hoy"
            items={[
                <Row horizontal="space-between" vertical="center">
                    <span className={[classes.itemTitle, classes.greyTitle].join(" ")}>
                        Crear nueva tarea
                    </span>
                    {renderAddButton(handleOpenModal)} 
                </Row>,
                ...tasks.map((task, index) => (
                    <TaskComponent
                        key={index}
                        classes={classes}
                        index={index}
                        item={task} 
                        onCheckboxClick={onCheckboxClick}
                        onTagClick={onTagClick}
                    />
                )),
            ]}
        />
    );
}

function TaskComponent({ classes, index, item = {}, onCheckboxClick, onTagClick }) {
    const prioridad = (item.prioridad || '').trim().toUpperCase();  
    const tag = TAGS[prioridad] || TAGS['ALTA'];  // Usamos 'ALTA' como valor por defecto si no se encuentra

    return (
        <Row horizontal='space-between' vertical='center'>
            <Row>
                <div className={classes.checkboxWrapper} onClick={() => onCheckboxClick(index)}>
                    {item.checked ? <IconCheckboxOn /> : <IconCheckboxOff />}
                </div>
                <span className={classes.itemTitle}>{item.titulo}</span> {/* Nombre de la tarea */}
            </Row>
            <TagComponent
                backgroundColor={tag.backgroundColor} 
                classes={classes}
                color={tag.color}  
                index={index}
                onClick={onTagClick}
                text={tag.text} 
            />
        </Row>
    );
}

function TagComponent({ backgroundColor, classes, color, index, onClick, text }) {
    return (
        <Row
            horizontal='center'
            vertical='center'
            style={{ backgroundColor, color }}
            className={classes.tagStyles}
            onClick={() => onClick(index)}
        >
            {text}
        </Row>
    );
}

export default TasksComponent;
