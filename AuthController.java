package org.grupo9.gestion_de_trabajadores_act2m13.controller;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Usuario;
import org.grupo9.gestion_de_trabajadores_act2m13.service.AuthService;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService crudService) {
        this.authService = crudService;
    }

    @PostMapping("/registrarUsuario")
    public String registrarUsuario(@RequestBody Usuario usuario) throws InterruptedException, ExecutionException {
        return authService.registrarNuevoUsuario(usuario);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> loginData) {
        String usernameOrEmail = loginData.get("usernameOrEmail");
        String password = loginData.get("password");
        return authService.loginUsuario(usernameOrEmail, password);
    }

    @PostMapping("/logout")
    public String logout(@RequestBody Map<String, String> loginData) {
        String usernameOrEmail = loginData.get("usernameOrEmail");
        return authService.logoutUsuario(usernameOrEmail);
    }

    @PostMapping("/crearEmpleado")
    public String crearEmpleado(@RequestBody Empleado empleado) throws InterruptedException, ExecutionException {
        return authService.guardarDatosEmpleado(empleado);
    }

    @GetMapping("/empleados")
    public List<Empleado> obtenerTodosLosEmpleados() throws InterruptedException, ExecutionException {
        return authService.obtenerTodosLosEmpleados();
    }

    @GetMapping("/obtenerDatosEmpleado")
    public Empleado obtenerEmpleado(@RequestHeader() String nombre) throws InterruptedException, ExecutionException {
        return authService.obtenerDatosEmpleado(nombre);
    }

    @PutMapping("/actualizarEmpleado")
    public String actualizarEmpleado(@RequestBody Empleado empleado) throws InterruptedException, ExecutionException {
        return authService.actualizarDatosEmpleado(empleado);
    }

    @DeleteMapping("/eliminarEmpleado")
    public String eliminarEmpleado(@RequestHeader String nombre) throws ExecutionException, InterruptedException {
        return authService.eliminarDatosEmpleado(nombre);
    }

    @GetMapping("/buscarEmpleado")
    public List<Empleado> buscarEmpleado(@RequestParam String criterio, @RequestParam String valor) throws ExecutionException, InterruptedException {
        return authService.buscarEmpleado(criterio, valor);
    }
    @PatchMapping("/actualizarEmpleadoParcial")
    public String actualizarEmpleadoParcial(@RequestBody Map<String, Object> updates, @RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.actualizarEmpleadoParcial(updates, id);
    }

    @GetMapping("/contarEmpleados")
    public long contarEmpleados() throws ExecutionException, InterruptedException {
        return authService.contarEmpleados();
    }

    @GetMapping("/obtenerTodosLosUsuarios")
    public List<Usuario> obtenerTodosLosUsuarios() throws ExecutionException, InterruptedException {
        return authService.obtenerTodosLosUsuarios();
    }

    @GetMapping("/contarUsuarios")
    public long contarUsuarios() {
        return authService.contarUsuarios();
    }

    @PutMapping("/actualizarUsuario")
    public String actualizarUsuario(@RequestBody Usuario usuario) throws ExecutionException, InterruptedException {
        return authService.actualizarDatosUsuario(usuario);
    }

    @GetMapping("/obtenerDatosUsuario")
    public Usuario obtenerDatosUsuario(@RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.obtenerDatosUsuario(id);
    }

    @GetMapping("/buscarUsuario")
    public List<Usuario> buscarUsuario(@RequestParam String criterio, @RequestParam String valor) throws ExecutionException, InterruptedException {
        return authService.buscarUsuario(criterio, valor);
    }

    @DeleteMapping("/eliminarUsuario")
    public String eliminarUsuario(@RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.eliminarDatosUsuario(id);
    }

    @PutMapping("/cambiarContrasenaUsuario")
    public String cambiarContrasenaUsuario(@RequestBody Map<String, String> datos) {
        String id = datos.get("id");
        String nuevaContrasena = datos.get("nuevaContrasena");
        return authService.cambiarContrasenaUsuario(id, nuevaContrasena);
    }

    @PatchMapping("/actualizarUsuarioParcial")
    public String actualizarUsuarioParcial(@RequestBody Map<String, Object> updates, @RequestParam String id) throws ExecutionException, InterruptedException {
        return authService.actualizarUsuarioParcial(updates, id);
    }

}