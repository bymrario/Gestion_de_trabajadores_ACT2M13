package org.grupo9.gestion_de_trabajadores_act2m13.model;

import java.util.Date;

public class Tarea {

    private String titulo;
    private String descripcion;
    private String estado; 
    private String prioridad; 
    private Date fechaCreacion;
    private Date fechaVencimiento;
    private String etiqueta;
    private String empleadoId;
    private boolean kanban;
    // Constructor vacío
    public Tarea() {
        super();
    }

    // Constructor completo
    public Tarea(String titulo, String descripcion, String estado, String prioridad,
                 Date fechaCreacion, Date fechaVencimiento, String etiqueta, String empleadoId, boolean kanban) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = estado;
        this.prioridad = prioridad;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
        this.etiqueta = etiqueta;
        this.empleadoId = empleadoId;
        this.kanban= kanban;
    }

    // Getters y Setters

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(String prioridad) {
        this.prioridad = prioridad;
    }

    public Date getFechaCreacion() {
        return fechaCreacion;
    }

    public void setFechaCreacion(Date fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public Date getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Date fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }

    public String getEtiqueta() {
        return etiqueta;
    }

    public void setEtiqueta(String etiqueta) {
        this.etiqueta = etiqueta;
    }
    
    public String getEmpleadoId() {
        return empleadoId;
    }
    
    public void setEmpleadoId(String empleadoId) {
        this.empleadoId = empleadoId;
    }

    public boolean isKanban(){
        return kanban;
    }

    public void setKanban(boolean kanban){
        this.kanban = kanban;
    }
}