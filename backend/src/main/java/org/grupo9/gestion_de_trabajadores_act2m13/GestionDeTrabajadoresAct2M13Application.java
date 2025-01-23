package org.grupo9.gestion_de_trabajadores_act2m13;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class GestionDeTrabajadoresAct2M13Application {

	public static void main(String[] args) throws FileNotFoundException {
		ClassLoader classLoader = GestionDeTrabajadoresAct2M13Application.class.getClassLoader();

		File file = new File("C:\\Users\\Mario\\Downloads\\Nueva carpeta (2)\\Gestion_de_trabajadores_ACT2M13-main\\Gestion_de_trabajadores_ACT2M13-main\\src\\main\\resources\\serviceAccountKey.json");
		FileInputStream serviceAccount = new FileInputStream(file.getAbsolutePath());


		FirebaseOptions options = null;
		try {
			options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAccount))
					.build();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

		FirebaseApp.initializeApp(options);


		SpringApplication.run(GestionDeTrabajadoresAct2M13Application.class, args);
	}

}