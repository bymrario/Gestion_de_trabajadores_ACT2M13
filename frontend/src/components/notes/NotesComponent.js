import React, { useState } from 'react';
import { createUseStyles, useTheme } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';

const useStyles = createUseStyles((theme) => ({
  container: {
    padding: '20px',
    maxWidth: '1280px', 
    margin: '0 auto',
    border: `3px solid ${theme.color.lightGrayishBlue2}`,
    borderRadius: '18px',
  },
  tools: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  activeButton: {
    backgroundColor: theme.color.primary,
    color: theme.color.white,
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  saveButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end', 
    width: '100%',
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '10px',
    fontSize: '16px',
    border: `1px solid ${theme.color.lightGrayishBlue2}`,
    borderRadius: '4px',
    resize: 'none',
    '&:focus': {
      outline: `2px solid ${theme.color.primary}`,
    },
  },
  notesContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
}));

const NotesComponent = () => {
  const theme = useTheme();
  const classes = useStyles({ theme });

  const [text, setText] = useState(''); 
  const [bold, setBold] = useState(false); 
  const [italic, setItalic] = useState(false); 
  const [underline, setUnderline] = useState(false); 
  const [color, setColor] = useState('#000000'); 
  const [fontSize, setFontSize] = useState(16); 
  const [notes, setNotes] = useState([]); 

  // Event handlers
  const handleChange = (event) => {
    setText(event.target.value);
  };

  const toggleBold = () => {
    setBold(!bold);
  };

  const toggleItalic = () => {
    setItalic(!italic);
  };

  const toggleUnderline = () => {
    setUnderline(!underline);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  const saveNote = () => {
    setNotes([...notes, text]);
    setText('');
  };

  return (
    <div className={classes.container}>
        <div className={classes.tools}>
            <button onClick={toggleBold} className={bold ? classes.activeButton : ''}>Negrita</button>
            <button onClick={toggleItalic} className={italic ? classes.activeButton : ''}>Itálica</button>
            <button onClick={toggleUnderline} className={underline ? classes.activeButton : ''}>Subrayado</button>
            <input type="color" value={color} onChange={handleColorChange} title="Cambiar color de texto" />
            <input type="range" min="10" max="50" value={fontSize} onChange={handleFontSizeChange} title="Ajustar tamaño de fuente" />
        </div>
        
        <div className={classes.saveButtonContainer}>
            <button onClick={saveNote} className={classes.activeButton}>Guardar Nota</button>
        </div>
        
        <textarea
            value={text}
            onChange={handleChange}
            style={{
            fontWeight: bold ? 'bold' : 'normal',
            fontStyle: italic ? 'italic' : 'normal',
            textDecoration: underline ? 'underline' : 'none',
            color: color,
            fontSize: `${fontSize}px`
            }}
            className={classes.textarea}
            placeholder="Escribe tu nota aquí..."
        />
        
        <h3>Notas guardadas</h3>
        
        <div className={classes.notesContainer}>
            {notes.map((note, index) => (
            <MiniCardComponent 
                key={index} 
                title={`Nota ${index + 1}`} 
                value={note} 
            />
            ))}
        </div>
    </div>
  );
};

export default NotesComponent;
