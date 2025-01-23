package org.grupo9.gestion_de_trabajadores_act2m13.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Cliente;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Factura;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Notas;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Proyecto;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Tarea;
import org.grupo9.gestion_de_trabajadores_act2m13.service.AuthService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    // Endpoints Cliente
    @PostMapping("/registrarCliente") // Ejemplo de uso POST http://localhost:8083/registrarCliente
    //{
    // "nombreCliente": "Mario",
    // "correo": "mario@prueba.com",
    // "contrasena": "hola",
    // "activo": true
    //}
    public String registrarCliente(@RequestBody Cliente cliente) {
        return authService.registrarNuevoCliente(cliente);
    }

    @GetMapping("/clientes") // Ejemplo de uso GET http://localhost:8083/clientes (PRESTAR ATENCIÓN A LA S FINAL, NO ES CLIENTE, ES CLIENTES)
    public List<Cliente> obtenerTodosLosClientes() throws ExecutionException, InterruptedException {
        return authService.obtenerTodosLosClientes();
    }

    @GetMapping("/cliente") // Ejemplo de uso GET http://localhost:8083/cliente?id=MW06EtzoylDFNPWOAFHq (AHORA ES CLIENTE, NO CLIENTES. LE AÑADIMOS EL PARAMETRO id seguido del ID en firebase)
    public Cliente obtenerDatosCliente(@RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.obtenerDatosCliente(id);
    }

    @DeleteMapping("/cliente") // Ejemplo de uso DELETE http://localhost:8083/cliente?id=MW06EtzoylDFNPWOAFHq (VOLVEMOS A LLAMAR A CLIENTE Y LE PASAMOS EL ID QUE QUERAMOS ELIMINAR DE FIREBASE)
    public String eliminarCliente(@RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.eliminarDatosCliente(id);
    }


    // Endpoints Empleado (Solo será uno)

    @PostMapping("/loginEmpleado") // Ejemplo de uso POST http://localhost:8083/loginEmpleado
    //{
    // "correo": "prueba@hola.com",
    // "contrasena": "pruebaborrar"
    //} Se comprueba si el empleado existe con las credenciales proporcionadas
    public String loginEmpleadoo(@RequestBody Map<String, String> loginData) {
        String correo = loginData.get("correo");
        String contrasena = loginData.get("contrasena");
        return authService.loginEmpleado(correo, contrasena);
    }

    @GetMapping("/empleado") //Obtenemos los empleados por su ID especifica en firebase GET http://localhost:8083/empleado?id=1
    public Empleado obtenerDatosEmpleadoPorId(@RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.obtenerDatosEmpleadoPorId(id);
    }

    @PutMapping("/actualizarEmpleado") // Ejemplo de uso PUT http://localhost:8083/actualizarEmpleado 
    //{
    // "id": "1",
    // "nombre": "Mario",
    // "correo": "mario@actualizar.com",
    // "contrasena": "contraseñaActualizada",
    // "activo": true,
    // "rol": "admin"
    //}
    public String actualizarEmpleado(@RequestBody Empleado empleado) throws ExecutionException, InterruptedException {
        return authService.actualizarDatosEmpleado(empleado);
    }


    // Endpoints tareas

    @PostMapping("/tareas")
    // Ejemplo JSON válido para agregar una tarea:
    // {
    //   "titulo": "Pruebaempleadoid",
    //   "descripcion": "empleadoid no quiere funcionar",
    //   "estado": "pendiente",
    //   "etiqueta": "prueba",
    //   "fechaVencimiento": "2025-01-30T12:00:00",
    //   "prioridad": "alta",
    //   "empleadoId": "1"
    // } empleadoId permanecerá siempre como 1 y deberá ser incluido en cada POST que se haga
    public String agregarTarea(@RequestBody Tarea tarea) throws ExecutionException, InterruptedException {
        return authService.agregarTarea(tarea);
    }

    @GetMapping("/tareas") // Ejemplo de uso GET http://localhost:8083/tareas?empleadoId=1 empleadoId SERÁ SIEMPRE 1, porque solo estamos manejando un usuario
    public List<Tarea> obtenerTareas(@RequestParam String empleadoId) throws ExecutionException, InterruptedException {
        return authService.obtenerTareasPorEmpleadoId(empleadoId);
    }

    @PutMapping("/tareas/{id}") // Ejemplo de uso PUT http://localhost:8083/tareas/ID TAREA 
    public String actualizarTarea(@PathVariable String id, @RequestBody Tarea tareaActualizada) throws ExecutionException, InterruptedException {
        return authService.actualizarTarea(id, tareaActualizada);
    }

    @DeleteMapping("/tareas/{id}") // Ejemplo de uso DELETE http://localhost:8083/tareas/ID TAREA
    public String eliminarTarea(@PathVariable String id) throws ExecutionException, InterruptedException {
        return authService.eliminarTarea(id);
    }

    @PostMapping("/facturas")
    // Ejemplo de uso POST http://localhost:8083/facturas
    //{
    // "clienteId": "TQfq8Pr6lSpbiE8IPrSU",
    // "items": [
    // "Servicio de Consultoría",
    //  100,
    //  2
    //],
    // "total": 400,
    // "impuesto": 40,
    // "descuento": 20,
    // "estado": "Pendiente",
    // "fecha": "2025-01-22",
    // "fechaVencimiento": "2025-02-01"
    //}
    public String crearFactura(@RequestBody Factura factura) {
        return authService.crearFactura(factura);
    }

    @GetMapping("/facturas/{idFactura}")// Ejemplo de uso GET http://localhost:8083/facturas/hFkuMfGuRPyEU7uyxkMX
    public Factura obtenerFacturaPorId(@PathVariable String idFactura) throws ExecutionException, InterruptedException {
        return authService.obtenerFacturaPorId(idFactura);
    }

    @PutMapping("/facturas/{idFactura}")
    // Ejemplo de uso PUT http://localhost:8083/facturas/hFkuMfGuRPyEU7uyxkMX
    //{
    // "clienteId": "TQfq8Pr6lSpbiE8IPrSU",
    // "items": [
    // "SE HA ACTUALIZADO",
    // 100,
    // 2
    //],
    // "total": 400,
    // "impuesto": 40,
    // "descuento": 20,
    // "estado": "ACABADO",
    // "fecha": "2025-01-22",
    // "fechaVencimiento": "2025-02-01"
    //}
    public String actualizarFactura(@PathVariable String idFactura, @RequestBody Factura facturaActualizada) {
        return authService.actualizarFactura(idFactura, facturaActualizada);
    }

    @DeleteMapping("/facturas/{idFactura}")// Ejemplo de uso DELETE http://localhost:8083/facturas/hFkuMfGuRPyEU7uyxkMX
    public String eliminarFactura(@PathVariable String idFactura) {
        return authService.eliminarFactura(idFactura);
    }

    @GetMapping("/facturas")//revisar
    public List<Factura> obtenerTodasLasFacturas() throws ExecutionException, InterruptedException {
        return authService.obtenerTodasLasFacturas();
    }

    // Endpoints proyectos

    @PostMapping("/proyectos")
    /* Ejemplo de uso POST http://localhost:8083/proyectos
    {
    "nombre": "Proyecto",
    "descripcion": "Descripción del proyecto",
    "estado": "En progreso",
    "prioridad": "Alta",
    "fechaCreacion": "2025-01-23T12:00:00",
    "fechaVencimiento": "2025-02-15T12:00:00",
    "etiqueta": "Importante",
    "empleadoId": "1",
    "kanban": true,
    "precio": "1",
    "empresa": "Empresa"
}
    */
    public String crearProyecto(@RequestBody Proyecto proyecto) {
        return authService.crearProyecto(proyecto);
    }

    @GetMapping("/proyectos/{idProyecto}")// Ejemplo de uso GET http://localhost:8083/proyectos/MW06EtzoylDFNPWOAFHq
    public Proyecto obtenerProyectoPorId(@PathVariable String idProyecto) throws ExecutionException, InterruptedException {
        return authService.obtenerProyectoPorId(idProyecto);
    }

    @PutMapping("/proyectos/{idProyecto}")
    /* Ejemplo de uso PUT http://localhost:8083/proyectos/MW06EtzoylDFNPWOAFHq
    {
    "nombre": "Proyecto Actualizado",
    "descripcion": "Descripción actualizada",
    "estado": "Finalizado",
    "prioridad": "Alta",
    "fechaCreacion": "2025-01-23T12:00:00",
    "fechaVencimiento": "2025-02-15T12:00:00",
    "etiqueta": "Importante",
    "empleadoId": "1",
    "kanban": true,
    "precio": "15",
    "empresa": "Empresa"
    }
    */
    public String actualizarProyecto(@PathVariable String idProyecto, @RequestBody Proyecto proyectoActualizado) {
        return authService.actualizarProyecto(idProyecto, proyectoActualizado);
    }

    @DeleteMapping("/proyectos/{idProyecto}")// Ejemplo de uso DELETE http://localhost:8083/proyectos/MW06EtzoylDFNPWOAFHq
    public String eliminarProyecto(@PathVariable String idProyecto) {
        return authService.eliminarProyecto(idProyecto);
    }

    @GetMapping("/proyectos")// Ejemplo de uso GET http://localhost:8083/proyectos
    public List<Proyecto> obtenerTodosLosProyectos() throws ExecutionException, InterruptedException {
        return authService.obtenerTodosLosProyectos();
    }


     // Endpoints para Notas
    @PostMapping("/notas")
    /* Ejemplo de uso POST http://localhost:8083/notas
    {
      "titulo": "Hola",
      "contenido": "hola"
    }
    */
    public String crearNota(@RequestBody Notas nota) {
        return authService.crearNota(nota);
    }

    @GetMapping("/notas/{idNota}")// Ejemplo de uso GET http://localhost:8083/notas/MW06EtzoylDFNPWOAFHq
    public Notas obtenerNotaPorId(@PathVariable String idNota) throws ExecutionException, InterruptedException {
        return authService.obtenerNotaPorId(idNota);
    }

    @PutMapping("/notas/{idNota}")
    /* Ejemplo de uso PUT http://localhost:8083/notas/MW06EtzoylDFNPWOAFHq
    {
      "titulo": "Actualizado",
      "contenido": "holax2"
    }
    */
    public String actualizarNota(@PathVariable String idNota, @RequestBody Notas notaActualizada) {
        return authService.actualizarNota(idNota, notaActualizada);
    }

    @DeleteMapping("/notas/{idNota}")// Ejemplo de uso DELETE http://localhost:8083/notas/MW06EtzoylDFNPWOAFHq
    public String eliminarNota(@PathVariable String idNota) {
        return authService.eliminarNota(idNota);
    }

    @GetMapping("/notas")// Ejemplo de uso GET http://localhost:8083/notas
    public List<Notas> obtenerTodasLasNotas() throws ExecutionException, InterruptedException {
        return authService.obtenerTodasLasNotas();
    }

}