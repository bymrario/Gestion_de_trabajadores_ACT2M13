import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    container: {
        padding: 30,
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        color: 'white',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    settingContainer: {
        marginBottom: 20,
        width: '100%',
        maxWidth: 400,
        padding: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 8,
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    },
    label: {
        display: 'block',
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        padding: '10px 20px',
        margin: '5px',
        fontSize: 16,
        border: 'none',
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'background 0.3s',
    },
    buttonPrimary: {
        backgroundColor: '#2575fc',
        color: 'white',
        '&:hover': {
            backgroundColor: '#6a11cb',
        },
    },
    buttonSecondary: {
        backgroundColor: '#f39c12',
        color: 'white',
        '&:hover': {
            backgroundColor: '#e67e22',
        },
    },
    select: {
        width: '100%',
        padding: '10px',
        fontSize: 16,
        marginBottom: 10,
        borderRadius: 4,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        color: '#333',
    },
    toggleButton: {
        background: 'transparent',
        border: '1px solid white',
        padding: '8px 16px',
        cursor: 'pointer',
        color: 'white',
        borderRadius: 4,
        fontSize: 16,
        transition: 'background 0.3s',
        '&:hover': {
            background: 'rgba(255, 255, 255, 0.2)',
        },
    },
});

function Settings() {
    const classes = useStyles();
    const [theme, setTheme] = useState('light');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [language, setLanguage] = useState('es');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const toggleNotifications = () => {
        setNotificationsEnabled(!notificationsEnabled);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className={classes.container}>
            <h1 className={classes.title}>Ajustes</h1>
            <div className={classes.settingContainer}>
                <label className={classes.label}>Tema</label>
                <button 
                    className={`${classes.button} ${classes.toggleButton}`}
                    onClick={toggleTheme}
                >
                    {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
                </button>
            </div>
            
            <div className={classes.settingContainer}>
                <label className={classes.label}>Notificaciones</label>
                <button 
                    className={`${classes.button} ${classes.toggleButton}`}
                    onClick={toggleNotifications}
                >
                    {notificationsEnabled ? 'Desactivar' : 'Activar'}
                </button>
            </div>

            <div className={classes.settingContainer}>
                <label className={classes.label}>Idioma</label>
                <select 
                    value={language} 
                    onChange={(e) => changeLanguage(e.target.value)} 
                    className={classes.select}
                >
                    <option value="es">Español</option>
                    <option value="en">Inglés</option>
                </select>
            </div>

            <div className={classes.settingContainer}>
                <button 
                    className={`${classes.button} ${classes.buttonPrimary}`}
                    onClick={() => alert('Ajustes guardados')}
                >
                    Guardar Ajustes
                </button>
            </div>
        </div>
    );
}

export default Settings;

