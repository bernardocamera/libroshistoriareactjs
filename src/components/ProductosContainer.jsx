import { useEffect, useState } from "react"
import "../styles/Productos.css"
import Card from "./Card"
import { useProductosContext } from "../contexts/ProductosContext"
import { useAuthContext } from "../contexts/AuthContext"

function ProductosContainer({}){
    const {productos, obtenerProductosFirebase, filtrarProductos} = useProductosContext();
    //const [productosComponente, setProductosComponente] = useState([])
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [filtro, setFiltro] = useState("")

    {useEffect(() => {
        obtenerProductosFirebase().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Hubo un problema al cargar los libros.');
            setCargando(false);
        })
    }, []);}

    useEffect(() => {
        if(filtro.length>0){
            filtrarProductos(filtro)
        }
    },[filtro])


    if (cargando) {
        return <p>Cargando productos...</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div className="productos-conteiner">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    className="form-control mb-3"
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                {productos.map((producto) => (
                    <Card
                        producto={producto}
                    />
                ))}
            </div>
        )
    }

    
}

export default ProductosContainer

