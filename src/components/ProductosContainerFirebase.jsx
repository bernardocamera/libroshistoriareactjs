import { useEffect, useMemo, useState } from "react";
import "../styles/Productos.css";
import { useProductosContext } from "../contexts/ProductosContext";
import CardProducto from "./Card";
import { Helmet } from "react-helmet";
import { FaSearch } from "react-icons/fa";
import { Col, Row } from "react-bootstrap";

function ProductosContainerFirebase() {
  const { productos, obtenerProductos } = useProductosContext();
  const productosPorPagina = 8;
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    obtenerProductos()
      .then(() => setCargando(false))
      .catch((error) => {
        console.log("Error", error);
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  const productosFiltrados = useMemo(() => {
    return productos.filter((producto) =>
      producto.name?.toLowerCase().includes(filtro.toLowerCase())
    );
  }, [productos, filtro]);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

  if (cargando) return <p>Cargando libros...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Helmet>
        <title>Libros | Libros Historia</title>
        <meta name="description" content="Explora nuestra gran variedad de libros de Historia." />
      </Helmet>

      <div className="input-group mb-3 mt-3">
        <span className="input-group-text">
          <FaSearch />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar libros..."
          value={filtro}
          onChange={(e) => {
            setFiltro(e.target.value);
            setPaginaActual(1); // reset a la página 1 al buscar
          }}
        />
      </div>

      <Row xs={1} md={2} lg={4} className="g-4">
        {productosActuales.length > 0 ? (
          productosActuales.map((producto) => (
            <Col key={producto.id}>
              <CardProducto producto={producto} />
            </Col>
          ))
        ) : (
          <p>No hay productos para mostrar.</p>
        )}
      </Row>

      <div className="d-flex justify-content-center my-4">
        {Array.from({ length: totalPaginas }, (_, index) => (
          <button
            key={index + 1}
            className={`btn mx-1 ${
              paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => cambiarPagina(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductosContainerFirebase;
