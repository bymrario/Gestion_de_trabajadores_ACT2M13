package org.grupo9.gestion_de_trabajadores_act2m13.model;
import java.util.Date;

public class Proyecto {
    private String nombre;
    private String descripcion;
    private String estado; 
    private String prioridad; 
    private Date fechaCreacion;
    private Date fechaVencimiento;
    private String etiqueta;
    private String empleadoId;
    private boolean kanban;
    private String precio;
    private String empresa;
    private double tiempoEmpleado;
    // Constructor vacío
    public Proyecto() {
        super();
    }

    // Constructor completo
    public Proyecto(String nombre, String descripcion, String estado, String prioridad,
                 Date fechaCreacion, Date fechaVencimiento, String etiqueta, String empleadoId, boolean kanban, String precio, String empresa, double tiempoEmpleado) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.estado = estado;
        this.prioridad = prioridad;
        this.fechaCreacion = fechaCreacion;
        this.fechaVencimiento = fechaVencimiento;
        this.etiqueta = etiqueta;
        this.empleadoId = empleadoId;
        this.kanban= kanban;
        this.precio= precio;
        this.empresa = empresa;
        this.tiempoEmpleado = tiempoEmpleado;
    }

    // Getters y Setters

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
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

    public String getPrecio(){
        return precio;
    }

    public void setPrecio(String precio){
        this.precio = precio;
    }

    public String getEmpresa(){
        return empresa;
    }

    public void setEmpresa(String empresa){
        this.empresa = empresa;
    }
    
    public double getTiempoEmpleado() {
        return tiempoEmpleado;
    }
    
    public void setTiempoEmpleado(double tiempoEmpleado) {
        this.tiempoEmpleado = tiempoEmpleado;
    }
}