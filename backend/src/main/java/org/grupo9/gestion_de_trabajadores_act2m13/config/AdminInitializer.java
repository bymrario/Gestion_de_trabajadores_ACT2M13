package org.grupo9.gestion_de_trabajadores_act2m13.config;

import java.util.ArrayList;
import java.util.Date;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import org.grupo9.gestion_de_trabajadores_act2m13.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {

    private final AuthService authService;

    public AdminInitializer(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void run(String... args) throws Exception {
        // Verificar si ya existe un empleado en Firestore con id = 1
        Empleado empleadoExistente = authService.obtenerDatosEmpleadoPorId("1");
        if (empleadoExistente == null) {
            // Crear empleado/freelancer genérico
            Empleado empleado = new Empleado();
            empleado.setId("1"); 
            empleado.setNombre("Prueba");
            empleado.setApellidos("Demo");
            empleado.setDniNIE("00000000X");
            empleado.setCorreo("freelancer@demo.com");
            empleado.setTelefono("123456789");
            empleado.setDireccion("Calle Freelancer, 123");
            empleado.setFechaNacimiento(new Date());
            empleado.setContrasena("123456");

            // Inicializamos listas vacías o con algún dato de prueba
            empleado.setNotas(new ArrayList<>());
            empleado.setListaClientes(new ArrayList<>());
            empleado.setEspecialidades(new ArrayList<>());
            empleado.setPortafolio("http://portfolio.com");

            authService.actualizarDatosEmpleado(empleado);

            System.out.println("Empleado por defecto (ID=1) creado.");
        } else {
            System.out.println("Ya existe un empleado con ID=1 en Firestore. No se creará otro.");
        }
    }
}