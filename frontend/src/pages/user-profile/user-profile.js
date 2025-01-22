import React from 'react';

export default function ProfilePage() {
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
              <h2 style={{ margin: '10px 0' }}>John Freelancer</h2>
              <p style={{ color: '#6c757d' }}>Full Stack Developer</p>
              <p style={{ color: '#6c757d' }}>España</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Contact */}
          <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
            <h3 style={{ marginBottom: '15px' }}>Información de Contacto</h3>
            <p><strong>Email:</strong> johne@freelancer.com</p>
            <p><strong>Phone:</strong> (34) 643667788</p>
            <p><strong>Mobile:</strong> (34) 643667788</p>
            <p><strong>Address:</strong> España</p>
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
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>CSS</li>
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
