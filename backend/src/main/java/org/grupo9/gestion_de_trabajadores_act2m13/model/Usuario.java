package org.grupo9.gestion_de_trabajadores_act2m13.model;

import org.springframework.stereotype.Component;

@Component
public class Usuario {

    private String id;
    private String nombreUsuario;
    private String correo;
    private String contrasena;
    private String rol;
    private boolean activo;

    // Constructor
    public Usuario() {
    }

    // Constructor completo
    public Usuario(String id, String nombreUsuario, String correo, String contrasena, String rol, boolean activo) {
        this.id = id;
        this.nombreUsuario = nombreUsuario;
        this.correo = correo;
        this.contrasena = contrasena;
        this.rol = rol;
        this.activo = activo;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }
}
