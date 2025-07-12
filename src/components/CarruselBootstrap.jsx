import { useProductosContext } from "../contexts/ProductosContext";
import { useEffect, useState } from "react";
import { Carousel, Container } from "react-bootstrap";

function CarruselBootstrap() {
  const { productos, obtenerProductos } = useProductosContext();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    console.log("Productos al iniciar:", productos);
    if (productos.length === 0) {
      obtenerProductos()
        .then((productosObtenidos) => {
          console.log("Productos cargados (del then):", productosObtenidos);
          setCargando(false);
        })
        .catch((error) => {
          console.error("Error al obtener productos:", error);
          setCargando(false);
        });
    } else {
      setCargando(false);
    }
  }, []); // Si querés que se actualice al cambiar productos, poné [productos]

  console.log("Render - cargando:", cargando, "productos:", productos);

  const primerosTres = productos.slice(0, 3);

  if (cargando) return <p className="text-center my-5">Cargando carrusel...</p>;
  if (primerosTres.length === 0)
    return <p className="text-center my-5">No hay productos para mostrar.</p>;

  return (
  <Container className="my-4" style={{ position: "relative", zIndex: 1 }}>
  <Carousel>
    {primerosTres.map((producto) => (
      <Carousel.Item key={producto.id}>
        <img
          className="d-block w-100"
          src={producto.imagen}
          alt={producto.name}
          style={{ height: "160px", objectFit: "cover" }}
        />
        <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "8px" }}>
          <h3>{producto.name}</h3>
          <p>{producto.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
</Container>
  );
}

export default CarruselBootstrap;
