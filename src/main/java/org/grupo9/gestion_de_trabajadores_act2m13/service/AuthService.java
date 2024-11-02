package org.grupo9.gestion_de_trabajadores_act2m13.service;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Usuario;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class AuthService {

    public String registrarNuevoUsuario(Usuario usuario) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        usuario.setRol("user"); // Rol 'user' por defecto para nuevos usuarios

        try {
            // Verificamos si el usuario ya existe por nombre de usuario
            if (existeUsuarioPorNombre(usuario.getNombreUsuario())) {
                return "Error: Ya existe un usuario con ese nombre de usuario.";
            }

            // Verificamos si el usuario ya existe por correo
            if (existeUsuarioPorCorreo(usuario.getCorreo())) {
                return "Error: Ya existe un usuario con ese correo electrónico.";
            }

            // Si no existe, se crea el nuevo usuario
            ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("usuarios").add(usuario);
            String idGenerado = collectionsApiFuture.get().getId();
            usuario.setId(idGenerado);
            return "Usuario creado con ID: " + idGenerado;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    // Metodo para verificar si existe un usuario por nombre de usuario
    public boolean existeUsuarioPorNombre(String nombreUsuario) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection("usuarios");
        Query query = usersCollection.whereEqualTo("nombreUsuario", nombreUsuario);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        return !querySnapshot.get().isEmpty();
    }

    // Metodo para verificar si existe un usuario por correo
    public boolean existeUsuarioPorCorreo(String correo) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection("usuarios");
        Query query = usersCollection.whereEqualTo("correo", correo);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        return !querySnapshot.get().isEmpty();
    }

    public String guardarDatosAdmin(Usuario usuario) {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        try {
            // Verificamos si ya existe un admin
            if (!existeAdmin()) {
                ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("admins").add(usuario);
                String idGenerado = collectionsApiFuture.get().getId();
                return "Admin creado con ID: " + idGenerado;
            } else {
                return "El administrador ya existe, no se puede crear uno nuevo.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public boolean existeAdmin() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference adminsCollection = dbFirestore.collection("admins");
        Query query = adminsCollection.limit(1); // Verificamos si ya hay algún admin
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        return !querySnapshot.get().isEmpty(); // Devuelve true si hay al menos un admin
    }

    public String loginUsuario(String usernameOrEmail, String password) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            // Intenta encontrar al usuario por nombre de usuario
            ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios")
                    .whereEqualTo("nombreUsuario", usernameOrEmail)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (documents.isEmpty()) {
                // Si no se encontró por username, intenta por correo
                future = dbFirestore.collection("usuarios")
                        .whereEqualTo("correo", usernameOrEmail)
                        .get();
                documents = future.get().getDocuments();
            }

            if (!documents.isEmpty()) {
                // Si lo encontró, verificamos la contraseña
                Usuario usuario = documents.get(0).toObject(Usuario.class);
                usuario.setId(documents.get(0).getId()); // Le asignamos el ID

                //Si la contraseña es correcta ponemos el usuario activo o conectado
                if (usuario.getContrasena().equals(password)) {
                    usuario.setActivo(true);
                    dbFirestore.collection("usuarios").document(usuario.getId()).set(usuario); // Guardamos

                    return "Login exitoso. Bienvenido, " + usuario.getNombreUsuario();
                } else {
                    return "Error: Contraseña incorrecta";
                }
            } else {
                return "Error: Usuario no encontrado";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public String logoutUsuario(String usernameOrEmail) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            // Intentamos encontrar al usuario por nombre de usuario
            ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios")
                    .whereEqualTo("nombreUsuario", usernameOrEmail)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (documents.isEmpty()) {
                // Si no se encontró por username, intenta por email
                future = dbFirestore.collection("usuarios")
                        .whereEqualTo("correo", usernameOrEmail)
                        .get();
                documents = future.get().getDocuments();
            }

            if (!documents.isEmpty()) {
                // Si lo encontró, actualizamos el estado a inactivo
                Usuario usuario = documents.get(0).toObject(Usuario.class);
                usuario.setActivo(false);

                // Guardamos
                dbFirestore.collection("usuarios").document(documents.get(0).getId()).set(usuario);
                return "Logout exitoso. Hasta luego, " + usuario.getNombreUsuario();
            } else {
                return "Error: Usuario no encontrado";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public String guardarDatosEmpleado(Empleado empleado) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            // Usamos 'add' para que Firestore genere un ID automáticamente
            ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("empleados").add(empleado);
            String idGenerado = collectionsApiFuture.get().getId();
            return "Empleado creado con ID: " + idGenerado;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public Empleado obtenerDatosEmpleado(String nombre) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("empleados").document(nombre);
        ApiFuture<DocumentSnapshot> documentSnapshot = docRef.get();

        DocumentSnapshot document = documentSnapshot.get();

        Empleado empleado = null;

        if (document.exists()) {
            empleado = document.toObject(Empleado.class);
            return empleado;
        }else {
            return null;
        }
    }

    public String actualizarDatosEmpleado(Empleado empleado) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("empleados").document(empleado.getId().toString()).set(empleado);
            return collectionsApiFuture.get().getUpdateTime().toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public String eliminarDatosEmpleado(String nombre) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<WriteResult> writeResult = dbFirestore.collection("empleados").document(nombre).delete();
            return "Empleado " + nombre + "ha sido eliminado";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
