// src/assets/requests.js
import { db } from "../auth/firebase";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

// Agregar producto a Firestore
export const agregarProducto = async (producto) => {
  try {
    const docRef = await addDoc(collection(db, "productos"), {
      ...producto,
      price: parseFloat(producto.price),
    });
    console.log("✅ Producto agregado con ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error al agregar producto:", error.message);
    throw new Error("No se pudo agregar el producto.");
  }
};

// Eliminar producto en Firestore
export const eliminarProducto = async (id) => {
  try {
    await deleteDoc(doc(db, "productos", id));
  } catch (error) {
    console.error("❌ Error al eliminar producto:", error.message);
    throw new Error("No se pudo eliminar el producto.");
  }
};
