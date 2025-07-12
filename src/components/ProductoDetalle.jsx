import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/ProductoDetalle.css";
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";

function ProductoDetalle({}) {

  const navegar = useNavigate();

  const {admin} = useAuthContext();
  const {agregarAlCarrito} = useContext(CarritoContext);
  const {productoEncontrado, obtenerProducto, eliminarProducto} = useProductosContext();

  const { id } = useParams();
  //const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  console.log(id)

  useEffect(() => {
    obtenerProducto(id).then(() => {
      setCargando(false);
    }).catch((error) => {
      if(error == "Libro no encontrado"){
        setError("Libro no encontrado")
      }
      if(error == "Hubo un error al obtener el libro."){
        setError("Hubo un error al obtener el libro.");
      }
      setCargando(false);
    })
  }, [id]);


  function funcionCarrito() {
    if (cantidad < 1) return;
    dispararSweetBasico("Libro Agregado", "El libro fue agregado al carrito con éxito", "success", "Cerrar");
    agregarAlCarrito({ ...productoEncontrado, cantidad });
  }

  function dispararEliminar(){
    eliminarProducto(id).then(() => {
      navegar("/productos")
    }).catch((error) => {
      dispararSweetBasico("Hubo un problema al agregar el libro", error, "error", "Cerrar")
    })
  }

  function sumarContador() {
    setCantidad(cantidad + 1);
  }

  function restarContador() {
    if (cantidad > 1) setCantidad(cantidad - 1);
  }

  if (cargando) return <p>Cargando libro...</p>;
  if (error) return <p>{error}</p>;
  if (!productoEncontrado) return null;

  return (
    <div className="detalle-container">
      <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontrado.name} />
      <div className="detalle-info">
        <h2>{productoEncontrado.name}</h2>
        <p>{productoEncontrado.description}</p>
        <p>{productoEncontrado.price} $</p>
        <div className="detalle-contador">
          <button onClick={restarContador}>-</button>
          <span>{cantidad}</span>
          <button onClick={sumarContador}>+</button>
        </div>
        {admin ? <Link to={"/admin/editarProducto/" + id}> <button>Editar libro</button></Link> : <button onClick={funcionCarrito}>Agregar al carrito</button> }
        {admin ? <button onClick={dispararEliminar} >Eliminar libro</button> : <></>}
      </div>
    </div>
  );
}

export default ProductoDetalle;
