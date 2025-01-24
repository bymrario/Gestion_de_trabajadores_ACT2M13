package org.grupo9.gestion_de_trabajadores_act2m13.model;

public class Notas {
    private String id;
    private String titulo;
    private String contenido;
    private String categoria;
    private String estado;

    // Constructor vacío
    public Notas() {
        super();
    }

    // Constructor completo
    public Notas(String id, String titulo, String contenido,String categoria,String estado) {
        this.id = id;
        this.titulo = titulo;
        this.contenido = contenido;
        this.categoria = categoria;
        this.estado = estado;
    }

    // Getters y Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getContenido() {
        return contenido;
    }

    public void setContenido(String contenido) {
        this.contenido = contenido;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }


}
