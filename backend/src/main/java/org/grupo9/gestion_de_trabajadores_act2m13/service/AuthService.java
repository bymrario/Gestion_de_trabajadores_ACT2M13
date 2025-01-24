package org.grupo9.gestion_de_trabajadores_act2m13.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

import org.grupo9.gestion_de_trabajadores_act2m13.model.Cliente;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Empleado;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Factura;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Notas;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Proyecto;
import org.grupo9.gestion_de_trabajadores_act2m13.model.Tarea;
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

    public String registrarNuevoCliente(Cliente cliente) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        cliente.setRol("cliente");
    
        System.out.println("Cliente recibido: " + cliente);
    
        try {
            if (existeClientePorNombre(cliente.getNombreCliente())) {
                System.out.println("Cliente con nombre ya existente.");
                return "Error: Ya existe un cliente con ese nombre.";
            }
    
            if (existeClientePorCorreo(cliente.getCorreo())) {
                System.out.println("Cliente con correo ya existente.");
                return "Error: Ya existe un cliente con ese correo electrónico.";
            }
    
            ApiFuture<DocumentReference> collectionsApiFuture = dbFirestore.collection("clientes").add(cliente);
            String idGenerado = collectionsApiFuture.get().getId();
            cliente.setId(idGenerado);
            System.out.println("Cliente registrado con éxito: " + cliente);
            return "Cliente registrado con éxito, ID: " + idGenerado;
    
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
    

    public boolean existeClientePorNombre(String nombreCliente) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("clientes").whereEqualTo("nombreCliente", nombreCliente);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        return !querySnapshot.get().isEmpty();
    }

    public boolean existeClientePorCorreo(String correo) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        Query query = dbFirestore.collection("clientes").whereEqualTo("correo", correo);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        return !querySnapshot.get().isEmpty();
    }

    public String loginEmpleado(String correo, String contrasena) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<QuerySnapshot> future = dbFirestore.collection("empleados")
                    .whereEqualTo("correo", correo)
                    .get();

            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            if (!documents.isEmpty()) {
                Empleado empleado = documents.get(0).toObject(Empleado.class);
                empleado.setId(documents.get(0).getId());

                if (empleado.getContrasena().equals(contrasena)) {
                    return "Login exitoso. Bienvenido, " + empleado.getNombre();
                } else {
                    return "Error: Contraseña incorrecta";
                }
            } else {
                return "Error: Empleado no encontrado.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public Empleado obtenerDatosEmpleadoPorId(String empleadoId) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        
        Query query = dbFirestore.collection("empleados").whereEqualTo("id", empleadoId);
        ApiFuture<QuerySnapshot> future = query.get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
    
        if (!documents.isEmpty()) {
            Empleado empleado = documents.get(0).toObject(Empleado.class);
            return empleado;
        }
        return null;
    }

    public String actualizarDatosEmpleado(Empleado empleado) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("empleados")
                    .document(String.valueOf(empleado.getId())).set(empleado);
            return "Actualización exitosa: " + collectionsApiFuture.get().getUpdateTime().toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }

    public List<Cliente> obtenerTodosLosClientes() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("clientes").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Cliente> clientes = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            clientes.add(document.toObject(Cliente.class));
        }
        return clientes;
    }

    public Cliente obtenerDatosCliente(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("clientes").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                return document.toObject(Cliente.class);
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String eliminarDatosCliente(String id) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            ApiFuture<WriteResult> writeResult = dbFirestore.collection("clientes").document(id).delete();
            return "Cliente con ID " + id + " ha sido eliminado exitosamente.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar cliente: " + e.getMessage();
        }
    }

    public String agregarTarea(Tarea tarea) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("tareas").document();
        tarea.setFechaCreacion(new Date());
        ApiFuture<WriteResult> future = docRef.set(tarea);
        return "Tarea creada con éxito: " + docRef.getId(); // Devuelve el ID del documento
    }

    public List<Tarea> obtenerTareasPorEmpleadoId(String empleadoId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference tareasRef = db.collection("tareas");
        Query query = tareasRef.whereEqualTo("empleadoId", empleadoId);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
    
        List<Tarea> tareas = new ArrayList<>();
        for (QueryDocumentSnapshot document : querySnapshot.get().getDocuments()) {
            Tarea tarea = document.toObject(Tarea.class);
            tareas.add(tarea);
        }
        return tareas;
    }

    public String actualizarTarea(String id, Tarea tareaActualizada) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
    
        try {
            // Buscar la tarea en Firestore por su ID
            DocumentReference tareaRef = dbFirestore.collection("tareas").document(id);
            ApiFuture<DocumentSnapshot> future = tareaRef.get();
            DocumentSnapshot document = future.get();
    
            if (document.exists()) {
                // Actualizar los campos de la tarea
                tareaRef.set(tareaActualizada);
                return "Tarea actualizada con éxito: " + id;
            } else {
                return "Error: No se encontró ninguna tarea con el ID proporcionado.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al actualizar la tarea: " + e.getMessage();
        }
    }
    
    public String eliminarTarea(String tareaId) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = db.collection("tareas").document(tareaId).delete();
        return "Tarea eliminada con éxito: " + writeResult.get().getUpdateTime();
    }

    
    // FACTURACIÓN

    //Crear una nueva factura
    public String crearFactura(Factura factura) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("facturas").document(); // Genera un ID único automáticamente
            factura.setIdFactura(docRef.getId());
            ApiFuture<WriteResult> future = docRef.set(factura);
            return "Factura creada con éxito. ID: " + factura.getIdFactura();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al crear la factura: " + e.getMessage();
        }
    }

    // Obtener una factura por ID
    public Factura obtenerFacturaPorId(String idFactura) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("facturas").document(idFactura);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Factura.class);
        } else {
            return null; 
        }
    }

    // Actualizar una factura existente
    public String actualizarFactura(String idFactura, Factura facturaActualizada) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("facturas").document(idFactura);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                docRef.set(facturaActualizada);
                return "Factura actualizada con éxito. ID: " + idFactura;
            } else {
                return "Error: No se encontró ninguna factura con el ID proporcionado.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al actualizar la factura: " + e.getMessage();
        }
    }

    // Eliminar una factura por ID
    public String eliminarFactura(String idFactura) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("facturas").document(idFactura);
            ApiFuture<WriteResult> writeResult = docRef.delete();
            return "Factura eliminada con éxito. ID: " + idFactura;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar la factura: " + e.getMessage();
        }
    }

    // Obtener todas las facturas 
    public List<Factura> obtenerTodasLasFacturas() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("facturas").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Factura> facturas = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            facturas.add(document.toObject(Factura.class));
        }
        return facturas;
    }

    //Proyecto

    // Crear un nuevo proyecto
    public String crearProyecto(Proyecto proyecto) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("proyectos").document(); // Genera un ID único automáticamente
            proyecto.setEmpleadoId(docRef.getId());
            ApiFuture<WriteResult> future = docRef.set(proyecto);
            return "Proyecto creado con éxito. ID: " + docRef.getId();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al crear el proyecto: " + e.getMessage();
        }
    }

    // Obtener un proyecto por ID
    public Proyecto obtenerProyectoPorId(String idProyecto) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("proyectos").document(idProyecto);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Proyecto.class);
        } else {
            return null;
        }
    }

    // Actualizar un proyecto existente
    public String actualizarProyecto(String idProyecto, Proyecto proyectoActualizado) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("proyectos").document(idProyecto);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                docRef.set(proyectoActualizado); 
                return "Proyecto actualizado con éxito. ID: " + idProyecto;
            } else {
                return "Error: No se encontró ningún proyecto con el ID proporcionado.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al actualizar el proyecto: " + e.getMessage();
        }
    }

    // Eliminar un proyecto por ID
    public String eliminarProyecto(String idProyecto) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("proyectos").document(idProyecto);
            ApiFuture<WriteResult> writeResult = docRef.delete();
            return "Proyecto eliminado con éxito. ID: " + idProyecto;
        } catch (Exception e) {
            e.printStackTrace();
        return "Error al eliminar el proyecto: " + e.getMessage();
        }
    }

    // Obtener todos los proyectos
    public List<Proyecto> obtenerTodosLosProyectos() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("proyectos").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Proyecto> proyectos = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            proyectos.add(document.toObject(Proyecto.class));
        }
        return proyectos;
    }

    //Notas
    // Crear una nueva nota
    public String crearNota(Notas nota) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("notas").document();
            nota.setId(docRef.getId());
            ApiFuture<WriteResult> future = docRef.set(nota);
            return "Nota creada con éxito. ID: " + nota.getId();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al crear la nota: " + e.getMessage();
        }
    }

    // Obtener una nota por ID
    public Notas obtenerNotaPorId(String idNota) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference docRef = dbFirestore.collection("notas").document(idNota);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        DocumentSnapshot document = future.get();

        if (document.exists()) {
            return document.toObject(Notas.class);
        } else {
            return null;
        }
    }

    // Actualizar una nota existente
    public String actualizarNota(String idNota, Notas notaActualizada) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("notas").document(idNota);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if (document.exists()) {
                docRef.set(notaActualizada); 
                return "Nota actualizada con éxito. ID: " + idNota;
            } else {
                return "Error: No se encontró ninguna nota con el ID proporcionado.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al actualizar la nota: " + e.getMessage();
        }
    }

    // Eliminar una nota por ID
    public String eliminarNota(String idNota) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        try {
            DocumentReference docRef = dbFirestore.collection("notas").document(idNota);
            ApiFuture<WriteResult> writeResult = docRef.delete();
            return "Nota eliminada con éxito. ID: " + idNota;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error al eliminar la nota: " + e.getMessage();
        }
    }

    // Obtener todas las notas
    public List<Notas> obtenerTodasLasNotas() throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = dbFirestore.collection("notas").get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        List<Notas> notas = new ArrayList<>();

        for (QueryDocumentSnapshot document : documents) {
            notas.add(document.toObject(Notas.class));
        }
        return notas;
    }
       
}