package org.grupo9.gestion_de_trabajadores_act2m13.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Usuario;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;

@Service
public class AuthService {

    public String registrarNuevoUsuario(Usuario usuario) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        usuario.setRol("user");

        try {
            if (existeUsuarioPorNombre(usuario.getNombreUsuario())) {
                return "Error: Ya existe un usuario con ese nombre de usuario.";
            }

            if (existeUsuarioPorCorreo(usuario.getCorreo())) {
                return "Error: Ya existe un usuario con ese correo electrónico.";
            }

            ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("usuarios").add(usuario);
            String idGenerado = collectionsApiFuture.get().getId();
            usuario.setId(idGenerado);
            return "Usuario creado con ID: " + idGenerado;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public boolean existeUsuarioPorNombre(String nombreUsuario) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection("usuarios");
        Query query = usersCollection.whereEqualTo("nombreUsuario", nombreUsuario);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        return !querySnapshot.get().isEmpty();
    }

    public boolean existeUsuarioPorCorreo(String correo) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        CollectionReference usersCollection = dbFirestore.collection("usuarios");
        Query query = usersCollection.whereEqualTo("correo", correo);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        return !querySnapshot.get().isEmpty();
    }

    public String existeUsuarioPorCorreo(Usuario usuario) {
        Firestore dbFirestore = FirestoreClient.getFirestore();

        try {
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
        Query query = adminsCollection.limit(1);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        return !querySnapshot.get().isEmpty();
    }

    public String loginUsuario(String usernameOrEmail, String password) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios")
                    .whereEqualTo("nombreUsuario", usernameOrEmail)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (documents.isEmpty()) {
                future = dbFirestore.collection("usuarios")
                        .whereEqualTo("correo", usernameOrEmail)
                        .get();
                documents = future.get().getDocuments();
            }

            if (!documents.isEmpty()) {
                Usuario usuario = documents.get(0).toObject(Usuario.class);
                usuario.setId(documents.get(0).getId());

                if (usuario.getContrasena().equals(password)) {
                    usuario.setActivo(true);
                    dbFirestore.collection("usuarios").document(usuario.getId()).set(usuario);

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
            ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios")
                    .whereEqualTo("nombreUsuario", usernameOrEmail)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (documents.isEmpty()) {
                future = dbFirestore.collection("usuarios")
                        .whereEqualTo("correo", usernameOrEmail)
                        .get();
                documents = future.get().getDocuments();
            }

            if (!documents.isEmpty()) {
                Usuario usuario = documents.get(0).toObject(Usuario.class);
                usuario.setActivo(false);
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
            ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("empleados").add(empleado);
            String idGenerado = collectionsApiFuture.get().getId();
            return "Empleado creado con ID: " + idGenerado;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public List<Empleado> obtenerTodosLosEmpleados() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("empleados").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Empleado> empleados = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            empleados.add(document.toObject(Empleado.class));
        }
        return empleados;
    }
    public long contarEmpleados() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("empleados").get();
        return future.get().getDocuments().size();
    }
    

    public Empleado obtenerDatosEmpleado(String nombre) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("empleados").document(nombre);
        ApiFuture<DocumentSnapshot> documentSnapshot = docRef.get();

        DocumentSnapshot document = documentSnapshot.get();

        if (document.exists()) {
            return document.toObject(Empleado.class);
        } else {
            return null;
        }
    }

    public List<Empleado> buscarEmpleado(String criterio, String valor) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("empleados").whereEqualTo(criterio, valor);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Empleado> empleados = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            empleados.add(document.toObject(Empleado.class));
        }
        return empleados;
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
        
    public String actualizarEmpleadoParcial(Map<String, Object> updates, String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("empleados").document(id);
        try {
            ApiFuture<WriteResult> writeResult = docRef.update(updates);
            return "Actualización exitosa: " + writeResult.get().getUpdateTime().toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public String eliminarDatosEmpleado(String nombre) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<WriteResult> writeResult = dbFirestore.collection("empleados").document(nombre).delete();
            return "Empleado " + nombre + " ha sido eliminado";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public List<Usuario> obtenerTodosLosUsuarios() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Usuario> usuarios = new ArrayList<>();
        
        for (QueryDocumentSnapshot document : documents) {
            usuarios.add(document.toObject(Usuario.class));
        }
        
        return usuarios;
    }
    public long contarUsuarios() {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<QuerySnapshot> future = dbFirestore.collection("usuarios").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            return documents.size();
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    public String actualizarDatosUsuario(Usuario usuario) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            // Obtenemos ID usuario 
            if (usuario.getId() == null || usuario.getId().isEmpty()) {
                return "Error: El ID del usuario no puede ser nulo o vacío.";
            }
    
            // Actualizamos el documento con los nuevos datos del usuario
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("usuarios")
                    .document(usuario.getId()).set(usuario);
    
            // Retornamos la fecha y hora de la actualización
            return "Actualización exitosa: " + collectionsApiFuture.get().getUpdateTime().toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public Usuario obtenerDatosUsuario(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("usuarios").document(id);
        ApiFuture<DocumentSnapshot> future = docRef.get();
    
        DocumentSnapshot document = future.get();
        if (document.exists()) {
            return document.toObject(Usuario.class);
        } else {
            return null;
        }
    }

    public List<Usuario> buscarUsuario(String criterio, String valor) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("usuarios").whereEqualTo(criterio, valor);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Usuario> usuarios = new ArrayList<>();
        
        for (QueryDocumentSnapshot document : documents) {
            usuarios.add(document.toObject(Usuario.class));
        }
        
        return usuarios;
    }

    public String eliminarDatosUsuario(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            // Eliminar usuario por ID
            ApiFuture<WriteResult> writeResult = dbFirestore.collection("usuarios").document(id).delete();
            return "Usuario con ID " + id + " ha sido eliminado";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public String cambiarContrasenaUsuario(String id, String nuevaContrasena) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            // Buscar el documento del usuario por su ID
            DocumentReference docRef = dbFirestore.collection("usuarios").document(id);
    
            // Obtener los datos del usuario actual
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            
            if (document.exists()) {
                // Si el usuario existe, cambiamos la contraseña
                Usuario usuario = document.toObject(Usuario.class);
                usuario.setContrasena(nuevaContrasena);
    
                // Guardamos cambios
                ApiFuture<WriteResult> writeResult = docRef.set(usuario);
    
                return "Contraseña actualizada con éxito en: " + writeResult.get().getUpdateTime().toString();
            } else {
                return "Error: Usuario no encontrado.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public String actualizarUsuarioParcial(Map<String, Object> updates, String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("usuarios").document(id);
        try {
            ApiFuture<WriteResult> writeResult = docRef.update(updates);
            return "Actualización exitosa: " + writeResult.get().getUpdateTime().toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }                      
        
}