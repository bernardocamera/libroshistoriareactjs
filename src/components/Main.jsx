import { Container, Row, Col, Image } from "react-bootstrap";
import "../styles/MainBootstrap.css"; // asegurate de que exista

function MainBootstrap() {
  return (
    <Container className="my-4">
      <Row className="align-items-center">
        <Col md={4}>
          <Image
            src="/imagenes/historiauniversal.png"
            alt="Imagen ilustrativa"
            fluid
            className="w-100 imagen-animada"
          />
        </Col>
        <Col md={8}>
          <div className="recuadro-saliente">
            <h2>Catálogo de Libros de Historia</h2>
            <p>
              Venta de libros de Historia Universal con amplia variedad disponible.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default MainBootstrap;