package org.grupo9.gestion_de_trabajadores_act2m13.controller;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Usuario;
import org.springframework.web.bind.annotation.*;

import org.grupo9.gestion_de_trabajadores_act2m13.service.AuthService;

import java.util.Map;
import java.util.concurrent.ExecutionException;

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

    @GetMapping("/obtenerDatosEmpleado")
    public Empleado obtenerEmpelado(@RequestHeader() String nombre) throws InterruptedException, ExecutionException {
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
}
