import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../styles/Productos.css";

function CardProducto({ producto }) {
  return (
    <Card className="h-100 d-flex flex-column">
      <Card.Img
        variant="top"
        src={producto.imagen}
        style={{ maxHeight: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{producto.name}</Card.Title>
        <div className="mt-auto">
          <Link to={"/productosF/" + producto.id}>
            <Button variant="primary">Ver detalles del libro</Button>
          </Link>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardProducto;
