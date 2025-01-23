package org.grupo9.gestion_de_trabajadores_act2m13.model;
import java.util.Date;
import java.util.List;

public class Factura {

    private String idFactura;            // ID único de la factura
    private String idCliente;            // ID del cliente asociado
    private List<String> items;          // Lista de ítems como cadenas (simple)
    private double total;                // Total bruto
    private double impuestos;            // Impuestos aplicados
    private double descuento;            // Descuento aplicado
    private String estado;               // Estado de la factura (Pendiente, Pagada, etc.)
    private Date fecha;                  // Fecha de emisión
    private Date fechaVencimiento;       // Fecha de vencimiento

    // Constructor vacío
    public Factura() {}

    // Constructor completo
    public Factura(String idFactura, String idCliente, List<String> items, double total, double impuestos,
                   double descuento, String estado, Date fecha, Date fechaVencimiento) {
        this.idFactura = idFactura;
        this.idCliente = idCliente;
        this.items = items;
        this.total = total;
        this.impuestos = impuestos;
        this.descuento = descuento;
        this.estado = estado;
        this.fecha = fecha;
        this.fechaVencimiento = fechaVencimiento;
    }

    // Getters y setters
    public String getIdFactura() {
        return idFactura;
    }

    public void setIdFactura(String idFactura) {
        this.idFactura = idFactura;
    }

    public String getIdCliente() {
        return idCliente;
    }

    public void setIdCliente(String idCliente) {
        this.idCliente = idCliente;
    }

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public double getImpuestos() {
        return impuestos;
    }

    public void setImpuestos(double impuestos) {
        this.impuestos = impuestos;
    }

    public double getDescuento() {
        return descuento;
    }

    public void setDescuento(double descuento) {
        this.descuento = descuento;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Date getFechaVencimiento() {
        return fechaVencimiento;
    }

    public void setFechaVencimiento(Date fechaVencimiento) {
        this.fechaVencimiento = fechaVencimiento;
    }
}