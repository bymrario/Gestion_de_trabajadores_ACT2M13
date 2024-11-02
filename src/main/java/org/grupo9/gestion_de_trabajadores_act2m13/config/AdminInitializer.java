package org.grupo9.gestion_de_trabajadores_act2m13.config;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Usuario;
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
        if (!authService.existeAdmin()) {
            Usuario admin = new Usuario("1", "admin", "admin@admin.com", "123456", "admin", true);
            authService.guardarDatosAdmin(admin);
            System.out.println("Usuario administrador creado por defecto");
        } else {
            System.out.println("Usuario administrador ya existe");
        }
    }
}
