import React, { useEffect, useState } from 'react';
import api from 'services/api';

export default function ProfilePage() {

  const [empleado, setEmpleado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ID del empleado, ajusta según sea necesario
    const empleadoId = '1';

    const fetchEmpleado = async () => {
      try {
        const response = await api.get('/empleado', {
          params: { id: empleadoId },
        });
        setEmpleado(response.data);
      } catch (err) {
        console.error('Error fetching empleado:', err);
        setError('Hubo un error al cargar los datos del empleado.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpleado();
  }, []);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!empleado) {
    return <p>No se encontraron datos para este empleado.</p>;
  }


  return (
    <section style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div style={{ flex: '1' }}>
          <div
            style={{
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
            }}
            >
              <img
                src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-3d-600nw-2124054758.jpg"
                alt="Profile"
                style={{ borderRadius: '50%', width: '150px', marginBottom: '10px' }}
              />
              <h2 style={{ margin: '10px 0' }}>{empleado.nombre} {empleado.apellidos}</h2>
              <p style={{ color: '#6c757d' }}>{empleado.portafolio || 'Sin especialidades'}</p>
              <p style={{ color: '#6c757d' }}>{empleado.pais}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Contact */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px' }}>Información de Contacto</h3>
            <p><strong>Email:</strong> {empleado.correo}</p>
            <p><strong>Teléfono:</strong> {empleado.telefono}</p>
            <p><strong>Dirección:</strong> {empleado.direccion}</p>
          </div>

          {/* Redes */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px' }}>Redes Sociales</h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              <li>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>LinkedIn</a>
              </li>
              <li>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>GitHub</a>
              </li>
              <li>
                <a href="#" style={{ color: '#007bff', textDecoration: 'none' }}>Twitter</a>
              </li>
            </ul>
          </div>

          {/* Habilidades */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px' }}>Habilidades</h3>
            <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
              {empleado.especialidades?.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) || <p>Sin habilidades registradas</p>}
            </ul>
          </div>

          {/* Project */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px' }}>Proyectos</h3>
            <p><strong>Proyectos Activos:</strong> 3</p>
            <p><strong>Proyectos Completados:</strong> 10</p>
            <p><strong>Tareas Pendientes:</strong> 5</p>
          </div>
        </div>
      </div>
    </section>
  );
}
