// src/config/firebaseConfig.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA1pXW65JoFfo5GNWk7kJcx02NdV-0Q8XA",
  authDomain: "appgestionempleados.firebaseapp.com",
  projectId: "appgestionempleados",
  storageBucket: "appgestionempleados.appspot.com",
  messagingSenderId: "526319264651",
  appId: "1:526319264651:web:846c02cf8f803b513e458e"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export default app;
