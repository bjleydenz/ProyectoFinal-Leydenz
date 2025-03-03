import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APIKEY,
  authDomain: "psmyplants.firebaseapp.com",
  projectId: "psmyplants",
  storageBucket: "psmyplants.firebasestorage.app",
  messagingSenderId: "505700567380",
  appId: "1:505700567380:web:dc6d0df07df9ee6a6ee0c1",
  measurementId: "G-334QEVZP8S",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Función para guardar contacto en Firestore
export const saveContact = async (contactData) => {
  try {
    const docRef = await addDoc(collection(db, "contactperson"), contactData);
    console.log("Contacto agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error al guardar contacto:", error);
    throw error;
  }
};

// Función para obtener productos
export const getProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "product"));
    const productsList = [];
    querySnapshot.forEach((doc) => {
      productsList.push({ id: doc.id, ...doc.data() });
    });
    return productsList;
  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};

// Función para obtener un producto por ID
export const getProductById = async (id) => {
  try {
    const docRef = doc(db, "product", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      throw new Error("Producto no encontrado");
    }
  } catch (error) {
    console.error("Error obteniendo el producto por ID:", error);
    throw error;
  }
};
