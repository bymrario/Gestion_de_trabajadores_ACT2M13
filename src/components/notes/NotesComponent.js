import React, { useState } from 'react';
import './Notes.css'; // Asegúrate de tener un archivo CSS para los estilos

const Notes = () => {
  const [texto, setTexto] = useState(''); // Para almacenar el texto escrito
  const [negrita, setNegrita] = useState(false); // Para activar/desactivar negrita

  // Manejadores de eventos
  const handleChange = (event) => {
    setTexto(event.target.value);
  };

  const toggleNegrita = () => {
    setNegrita(!negrita);
  };

  return (
    <div className="notas-container">
      <div className="tools">
        <button onClick={toggleNegrita} className={negrita ? 'active' : ''}>
          Negrita
        </button>
        {/* Puedes agregar más botones aquí como color de texto, pincel, etc. */}
      </div>
      <textarea
        value={texto}
        onChange={handleChange}
        style={{ fontWeight: negrita ? 'bold' : 'normal' }}
        placeholder="Escribe tu nota aquí..."
      />
    </div>
  );
};

export default Notas;
