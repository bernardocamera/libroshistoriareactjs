import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import { CarritoContext } from "../contexts/CarritoContext";
import { AuthContext, useAuthContext } from "../contexts/AuthContext.jsx";
import CarritoCardBootstrap from "./CarritoCardBootstrap";
import "../styles/CarritoBootstrap.css";

function CarritoBootstrap() {
    const {user} = useContext(AuthContext);
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad,
        0
    );

    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }

    function funcionDisparadora2() {
        vaciarCarrito();
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return (
        <Container className="my-4">
        <h2 className="mb-3">Carrito de compras</h2>

        <Button className="mb-4 btn-vaciar" onClick={funcionDisparadora2}>
            Vaciar carrito
        </Button>

        {productosCarrito.length > 0 ? (
            productosCarrito.map((producto) => (
            <CarritoCardBootstrap
                key={producto.id}
                producto={producto}
                funcionDisparadora={funcionDisparadora}
            />
            ))
        ) : (
            <p>Carrito vacío</p>
        )}

        {total > 0 && (
            <h4 className="mt-4 text-end">Total a pagar: {total.toFixed(2)} $</h4>
        )}
        </Container>
    );
}

export default CarritoBootstrap;
