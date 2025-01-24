import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import api from 'services/api';

const useStyles = createUseStyles({
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: 20,
  },
  th: {
    backgroundColor: '#3116AB',
    color: '#fff', 
    padding: '8px',
    textAlign: 'left',
  },
  td: {
    padding: '8px',
    border: '1px solid #ddd',
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    fontSize: '18px',
  },
});

const ListTasksComponent = ({ containerStyles }) => {
  const classes = useStyles();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <div className={classes.loading}>Cargando tareas...</div>;
  if (error) return <div className={classes.error}>{error}</div>;

  return (
    <div className={containerStyles}>
      <h3>Listado de Tareas</h3>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.th}>Título</th>
            <th className={classes.th}>Descripción</th>
            <th className={classes.th}>Estado</th>
            <th className={classes.th}>Prioridad</th>
            <th className={classes.th}>Fecha de Creación</th>
            <th className={classes.th}>Fecha de Vencimiento</th>
            <th className={classes.th}>Etiqueta</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className={classes.tr}>
              <td className={classes.td}>{task.titulo}</td>
              <td className={classes.td}>{task.descripcion}</td>
              <td className={classes.td}>{task.estado}</td>
              <td className={classes.td}>{task.prioridad}</td>
              <td className={classes.td}>{new Date(task.fechaCreacion).toLocaleString()}</td>
              <td className={classes.td}>{new Date(task.fechaVencimiento).toLocaleString()}</td>
              <td className={classes.td}>{task.etiqueta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTasksComponent;
