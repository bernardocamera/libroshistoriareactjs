import React, { createContext, useState, useContext, useEffect } from 'react';
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '../auth/firebase.js';

const ProductosContext = createContext();

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [productoEncontrado, setProductoEncontrado] = useState(null);

  // Obtener todos los productos
  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'productos'));
      const datos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(datos);
      return datos;
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  };

  // Obtener un solo producto por ID
  const obtenerProducto = async (id) => {
    try {
      const ref = doc(db, 'productos', id);
      const docSnap = await getDoc(ref);
      if (docSnap.exists()) {
        const producto = { id: docSnap.id, ...docSnap.data() };
        setProductoEncontrado(producto);
        return producto;
      } else {
        throw new Error('Producto no encontrado');
      }
    } catch (error) {
      console.error("Error al obtener producto:", error);
      throw error;
    }
  };

  // Agregar producto
  const agregarProducto = async (producto) => {
    try {
      const docRef = await addDoc(collection(db, 'productos'), producto);
      const nuevoProducto = { id: docRef.id, ...producto };
      setProductos(prev => [...prev, nuevoProducto]);
      return nuevoProducto;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  };

  // Editar producto
  const editarProducto = async (producto) => {
    try {
      const ref = doc(db, 'productos', producto.id);
      await updateDoc(ref, {
        name: producto.name,
        price: producto.price,
        imagen: producto.imagen,
        description: producto.description,
      });
      setProductos(prev =>
        prev.map(p => (p.id === producto.id ? producto : p))
      );
      return producto;
    } catch (error) {
      console.error("Error al editar producto:", error);
      throw error;
    }
  };

  // Eliminar producto
  const eliminarProducto = async (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar?');
    if (confirmar) {
      try {
        await deleteDoc(doc(db, 'productos', id));
        setProductos(prev => prev.filter(p => p.id !== id));
        alert('Producto eliminado correctamente.');
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert('Hubo un problema al eliminar el producto.');
        throw error;
      }
    }
  };

  return (
    <ProductosContext.Provider
      value={{
        productos,
        productoEncontrado,
        obtenerProductos,
        obtenerProducto,
        agregarProducto,
        editarProducto,
        eliminarProducto,
      }}
    >
      {children}
    </ProductosContext.Provider>
  );
}

export const useProductosContext = () => useContext(ProductosContext);
