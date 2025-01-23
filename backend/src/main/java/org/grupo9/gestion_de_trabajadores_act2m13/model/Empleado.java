package org.grupo9.gestion_de_trabajadores_act2m13.model;

import java.util.Date;
import java.util.List;

public class Empleado {

    private String id;
    private String nombre;
    private String apellidos;
    private String dniNIE;
    private String correo;
    private String telefono;
    private String direccion;
    private Date fechaNacimiento;
    private String contrasena;
    private String pais;
    private String username;
    private List<String> notas;// Notas personales del freelancer
    private List<Cliente> listaClientes;
    private List<String> especialidades; 
    private String portafolio; 

    // Constructor vacío
    public Empleado() {
        super();
    }

    // Constructor completo (si lo necesitas)
    public Empleado(String id, String nombre, String apellidos, String dniNIE, String correo,
                    String telefono, String direccion, Date fechaNacimiento, String contrasena,
                    List<String> notas, List<Cliente> listaClientes, List<String> especialidades,
                    String portafolio, String pais, String username) {

        this.id = id;  // Ahora es String
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.dniNIE = dniNIE;
        this.correo = correo;
        this.telefono = telefono;
        this.direccion = direccion;
        this.fechaNacimiento = fechaNacimiento;
        this.contrasena = contrasena;
        this.notas = notas;
        this.listaClientes = listaClientes;
        this.especialidades = especialidades;
        this.portafolio = portafolio;
        this.pais = pais;
        this.username = username;
    }

    // Getters y setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getContrasena() {
        return contrasena;
    }

    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    public List<String> getNotas() {
        return notas;
    }

    public void setNotas(List<String> notas) {
        this.notas = notas;
    }

    public List<Cliente> getListaClientes() {
        return listaClientes;
    }

    public void setListaClientes(List<Cliente> listaClientes) {
        this.listaClientes = listaClientes;
    }

    public List<String> getEspecialidades() {
        return especialidades;
    }

    public void setEspecialidades(List<String> especialidades) {
        this.especialidades = especialidades;
    }

    public String getPortafolio() {
        return portafolio;
    }

    public void setPortafolio(String portafolio) {
        this.portafolio = portafolio;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}