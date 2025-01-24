package org.grupo9.gestion_de_trabajadores_act2m13.model;

public class Contacto {

    private String id;
    private String nombreContacto;
    private String correo;
    private String rol;
    private boolean activo;

    // Constructor vacío
    public Contacto() {
    }

    // Constructor completo
    public Contacto(String id, String nombreContacto, String correo, String rol, boolean activo) {
        this.id = id;
        this.nombreContacto = nombreContacto;
        this.correo = correo;
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

    public String getNombreContacto() {
        return nombreContacto;
    }

    public void setNombreContacto(String nombreContacto) {
        this.nombreContacto = nombreContacto;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
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