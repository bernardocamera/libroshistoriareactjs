import { useEffect } from 'react';
import './App.css';
import Home from './layouts/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBoostrap from './components/NavBoostrap';
import ProductosContainerFirebase from './components/ProductosContainerFirebase';
import ProductoDetalleFirebase from './components/ProductoDetalleFirebase';
import FormularioProductoFirebase from './components/FormularioProductoFirebase';
import CarritoBootstrap from './components/CarritoBootstrap';
import About from './components/About';
import Contacto from './components/Contacto';
import ProductoDetalle from './components/ProductoDetalle';
import Admin from './components/Admin';
import Login2 from './components/Login2';
import FormularioEdicion from './components/FormularioEdicion';
import { useAuthContext } from './contexts/AuthContext';
import { ProductosProvider } from './contexts/ProductosContext';  // <-- Importá el provider

function App() {
  const { verificacionLog } = useAuthContext();

  useEffect(() => {
    verificacionLog();
  }, []);

  return (
    <ProductosProvider>  {/* Envolvés toda la app acá */}
      <Router>
        {/* Aplicamos la clase georgia-font aquí */}
        <div className="georgia-font">
          <NavBoostrap />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login2 />} />
            <Route path="/productos" element={<ProductosContainerFirebase />} />
            <Route path="/productosF/:id" element={<ProductoDetalleFirebase />} />
            <Route path="/agregarproducto" element={<FormularioProductoFirebase />} />
            <Route path="/carrito" element={<CarritoBootstrap />} />
            <Route path="/nosotros" element={<About />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/productos/:id" element={<ProductoDetalle />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/agregarProductos" element={<FormularioProductoFirebase />} />
            <Route path="/admin/editarProducto/:id" element={<FormularioEdicion />} />
          </Routes>
        </div>
      </Router>
    </ProductosProvider>
  );
}

export default App;
