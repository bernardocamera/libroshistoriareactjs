import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useProductosContext } from '../contexts/ProductosContext';
import { useAuthContext } from '../contexts/AuthContext';
import { dispararSweetBasico } from '../assets/SweetAlert';
import "../styles/FormularioProductoFirebase.css";

function FormularioEdicion() {
  const { id } = useParams();
  const { admin } = useAuthContext();
  const { obtenerProducto, productoEncontrado, editarProducto } = useProductosContext();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imagen: '',
    description: ''
  });

  useEffect(() => {
    obtenerProducto(id);
  }, [id]);

  useEffect(() => {
    if (productoEncontrado) {
      setFormData({
        name: productoEncontrado.name || '',
        price: productoEncontrado.price || '',
        imagen: productoEncontrado.imagen || '',
        description: productoEncontrado.description || ''
      });
    }
  }, [productoEncontrado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await editarProducto({ id, ...formData });
      dispararSweetBasico("Éxito", "El libro fue editado correctamente.", "success");
    } catch (error) {
      console.error("Error al editar:", error);
      dispararSweetBasico("Error", "No se pudo editar el libro.", "error");
    }
  };

  if (!admin) return <Navigate to="/login" replace />;
  if (!productoEncontrado) return <p>Cargando...</p>;

  return (
    <form onSubmit={handleSubmit} className="formulario-container">
      <h2>Editar Libro</h2>

      <div className="formulario-grupo">
        <label htmlFor="name">Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <div className="formulario-grupo">
        <label htmlFor="imagen">URL de la Imagen:</label>
        <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} required />
      </div>

      <div className="formulario-grupo">
        <label htmlFor="price">Precio:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" />
      </div>

      <div className="formulario-grupo">
        <label htmlFor="description">Descripción:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required />
      </div>

      <button type="submit">Guardar cambios</button>
    </form>
  );
}

export default FormularioEdicion;
