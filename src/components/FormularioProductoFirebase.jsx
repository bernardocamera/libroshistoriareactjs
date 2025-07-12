import React, { useState, useEffect } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { agregarProducto } from '../assets/requests';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import "../styles/FormularioProductoFirebase.css";

function FormularioProductoFirebase() {
  const { admin, user } = useAuthContext();

  const [producto, setProducto] = useState({
    name: '',
    price: '',
    description: '',
    imagen: ''
  });

  useEffect(() => {
    console.log('🧾 Renderizando FormularioProductoFirebase');
    console.log('👤 Usuario logueado:', user?.email || 'Ninguno');
    console.log('👑 ¿Es admin?:', admin);
  }, [admin, user]);

  const validarFormulario = () => {
    if (!producto.name.trim()) return 'El nombre es obligatorio.';
    if (!producto.price || producto.price <= 0) return 'El precio debe ser mayor a 0.';
    if (!producto.description.trim() || producto.description.length < 10)
      return 'La descripción debe tener al menos 10 caracteres.';
    if (!producto.imagen.trim()) return 'La URL de la imagen no debe estar vacía.';
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const validacion = validarFormulario();

    if (validacion === true) {
      try {
        const resultado = await agregarProducto(producto);
        console.log('✅ Producto guardado en Firebase:', resultado);
        dispararSweetBasico('Producto agregado', 'Se guardó correctamente.', 'success', 'Cerrar');
        setProducto({ name: '', price: '', description: '', imagen: '' });
      } catch (error) {
        console.error('❌ Error al agregar producto:', error);
        dispararSweetBasico('Error', 'No se pudo guardar el producto.', 'error', 'Cerrar');
      }
    } else {
      console.warn('⚠️ Validación fallida:', validacion);
      dispararSweetBasico('Formulario inválido', validacion, 'error', 'Cerrar');
    }
  };

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <form onSubmit={handleSubmit2} className="formulario-container">
      <h2>Agregar Producto</h2>

      <div className="formulario-grupo">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={producto.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formulario-grupo">
        <label htmlFor="imagen">URL de la Imagen:</label>
        <input
          type="text"
          id="imagen"
          name="imagen"
          value={producto.imagen}
          onChange={handleChange}
          required
        />
      </div>

      <div className="formulario-grupo">
        <label htmlFor="price">Precio:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={producto.price}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div className="formulario-grupo">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={producto.description}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default FormularioProductoFirebase;
