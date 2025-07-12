import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import Swal from "sweetalert2";
import { eliminarProducto } from "../assets/requests";

function ProductoDetalleFirebase() {
  const navegar = useNavigate();
  const { admin } = useAuthContext();
  const { agregarAlCarrito } = useContext(CarritoContext);
  const { productoEncontrado, obtenerProducto } = useProductosContext();
  const { id } = useParams();
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    obtenerProducto(id)
      .then(() => setCargando(false))
      .catch((error) => {
        setError(error);
        setCargando(false);
      });
  }, [id]);

  const funcionCarrito = () => {
    if (cantidad < 1) return;
    dispararSweetBasico(
      "Libro Agregado",
      "El libro fue agregado al carrito con éxito",
      "success",
      "Cerrar"
    );
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  };

  const sumarContador = () => setCantidad(cantidad + 1);
  const restarContador = () => cantidad > 1 && setCantidad(cantidad - 1);

  // Nueva función para manejar eliminación con SweetAlert2
  const handleEliminar = async () => {
    const resultado = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (resultado.isConfirmed) {
      try {
        await eliminarProducto(id);
        dispararSweetBasico(
          "Producto eliminado",
          "Se eliminó correctamente.",
          "success",
          "Cerrar"
        );
        navegar("/productos");
      } catch (error) {
        dispararSweetBasico(
          "Error",
          "No se pudo eliminar el producto.",
          "error",
          "Cerrar"
        );
      }
    }
  };

  if (cargando) return <p>Cargando libro...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img
        className="detalle-imagen"
        src={productoEncontrado.imagen}
        alt={productoEncontrado.name}
      />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>{productoEncontrado.price} $</p>

        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>

        {admin ? (
          <>
            <Link to={"/admin/editarProducto/" + id}>
              <button>Editar libro</button>
            </Link>
            <button onClick={handleEliminar}>Eliminar libro</button>
          </>
        ) : (
          <button onClick={funcionCarrito}>Agregar al carrito</button>
        )}
      </div>
    </div>
  );
}

export default ProductoDetalleFirebase;
