# Gestión de Trabajadores

## Descripción

La aplicación **Gestión de Trabajadores** es una aplicación diseñada para ayudar a las empresas en la administración de sus trabajadores. Permite a los administradores gestionar la información de los empleados, incluidos sus horarios y puestos de trabajo. La aplicación está construida utilizando Java con Spring Boot para el backend y React para el frontend.

## Características

- **Registro de Usuarios**: Permite el registro de nuevos usuarios (empleados) con un rol predeterminado.
- **Inicio de Sesión**: Los usuarios pueden iniciar sesión utilizando su nombre de usuario o correo electrónico.
- **Gestión de Empleados**: Los administradores pueden añadir, actualizar y eliminar información de empleados.
- **Verificación de Usuarios**: Evita duplicados en el registro de usuarios al verificar tanto el nombre de usuario como el correo electrónico.
- **Estado de Conexión**: Mantiene el estado de "activo" del usuario al iniciar sesión y lo cambia a "inactivo" al cerrar sesión.

## Tecnologías Utilizadas

- **Backend**: Java, Spring Boot, Firebase
- **Frontend**: React
- **Base de Datos**: Firestore (Firebase)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/bymrario/Gestion_de_trabajadores_ACT2M13.git