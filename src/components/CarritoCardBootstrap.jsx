import { Card, Row, Col, Button } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

function CarritoCardBootstrap({ producto, funcionDisparadora }) {
  function borrarDelCarrito() {
    funcionDisparadora(producto.id);
  }

  return (
    <Card className="mb-3">
      <Card.Body>
        <Row className="align-items-center">
          <Col md={3}>
            <Card.Img
              variant="top"
              src={producto.imagen}
              style={{ maxHeight: "100px", objectFit: "cover", width: "100%" }}
            />
          </Col>
          <Col md={2}>
            <Card.Title>{producto.name}</Card.Title>
            <Card.Text className="text-muted">{producto.description}</Card.Text>
          </Col>
          <Col md={1}>
            <span>Cant: {producto.cantidad}</span>
          </Col>
          <Col md={2}>
            <span>Precio: {producto.price} $</span>
          </Col>
          <Col md={2}>
            <span>Subtotal: {producto.cantidad * producto.price} $</span>
          </Col>
          <Col md={2}>
            <Button
              onClick={borrarDelCarrito}
              title="Eliminar del carrito"
              className="btn-trash"
              aria-label="Eliminar producto"
            >
              <FaTrash size={18} />
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default CarritoCardBootstrap;
