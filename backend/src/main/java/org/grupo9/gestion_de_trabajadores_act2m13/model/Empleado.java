package org.grupo9.gestion_de_trabajadores_act2m13.model;

import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class Empleado {

    private Long id;
    private String nombre;
    private String apellidos;
    private String dniNIE;
    private String correo;
    private String telefono;
    private Date fechaInicio;
    private String departamento;
    private String horarioTrabajo;
    private String rolAcceso;
    private String direccion;
    private Date fechaNacimiento;
    private String estadoLaboral;
    private Date fechaFinContrato;
    private String supervisor;

    // Constructor
    public Empleado() {
        super();
    }

    // Constructor completo
    public Empleado(String nombre, String apellidos, String dniNIE, String correo, String telefono,
                    Date fechaInicio, String departamento, String horarioTrabajo, String rolAcceso,
                    String direccion, Date fechaNacimiento, String estadoLaboral, Date fechaFinContrato, String supervisor) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dniNIE = dniNIE;
        this.correo = correo;
        this.telefono = telefono;
        this.fechaInicio = fechaInicio;
        this.departamento = departamento;
        this.horarioTrabajo = horarioTrabajo;
        this.rolAcceso = rolAcceso;
        this.direccion = direccion;
        this.fechaNacimiento = fechaNacimiento;
        this.estadoLaboral = estadoLaboral;
        this.fechaFinContrato = fechaFinContrato;
        this.supervisor = supervisor;
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellidos() {
        return apellidos;
    }

    public void setApellidos(String apellidos) {
        this.apellidos = apellidos;
    }

    public String getDniNIE() {
        return dniNIE;
    }

    public void setDniNIE(String dniNIE) {
        this.dniNIE = dniNIE;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public Date getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(Date fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public String getDepartamento() {
        return departamento;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getHorarioTrabajo() {
        return horarioTrabajo;
    }

    public void setHorarioTrabajo(String horarioTrabajo) {
        this.horarioTrabajo = horarioTrabajo;
    }

    public String getRolAcceso() {
        return rolAcceso;
    }

    public void setRolAcceso(String rolAcceso) {
        this.rolAcceso = rolAcceso;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Date getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(Date fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getEstadoLaboral() {
        return estadoLaboral;
    }

    public void setEstadoLaboral(String estadoLaboral) {
        this.estadoLaboral = estadoLaboral;
    }

    public Date getFechaFinContrato() {
        return fechaFinContrato;
    }

    public void setFechaFinContrato(Date fechaFinContrato) {
        this.fechaFinContrato = fechaFinContrato;
    }

    public String getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(String supervisor) {
        this.supervisor = supervisor;
    }
}
