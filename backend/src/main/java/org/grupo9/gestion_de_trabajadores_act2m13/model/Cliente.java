package org.grupo9.gestion_de_trabajadores_act2m13.model;

public class Cliente {

    private String id;
    private String nombreCliente;
    private String correo;
    private String contrasena;
    private String rol;
    private boolean activo;

    // Constructor vacío
    public Cliente() {
    }

    // Constructor completo
    public Cliente(String id, String nombreCliente, String correo, String contrasena, String rol, boolean activo) {
        this.id = id;
        this.nombreCliente = nombreCliente;
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

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
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