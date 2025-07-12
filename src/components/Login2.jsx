import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';
import "../styles/Login2.css";


function Login2() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(true);
  const { login, user, logout, admin, logearGmail } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (usuario === 'admin' && password === '1234') {
      login(usuario);
      navigate('/');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  function registrarUsuario(e) {
    e.preventDefault();
    crearUsuario(usuario, password).then((user) => {
      login(usuario);
      dispararSweetBasico('Logeo exitoso', '', 'success', 'Confirmar');
    }).catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        dispararSweetBasico('Credenciales incorrectas', '', 'error', 'Cerrar');
      }
      if (error.code === 'auth/weak-password') {
        dispararSweetBasico('Contraseña débil', 'Password should be at least 6 characters', 'error', 'Cerrar');
      }
    });
  }

  const handleSubmit2 = (e) => {
    logout();
  };

  function logInGmail() {
    logearGmail();
  }

  function iniciarSesionEmailPass(e) {
    e.preventDefault();
    loginEmailPass(usuario, password).then((user) => {
      login(usuario);
      dispararSweetBasico('Logeo exitoso', '', 'success', 'Confirmar');
    }).catch((error) => {
      if (error.code === 'auth/invalid-credential') {
        dispararSweetBasico('Credenciales incorrectas', '', 'error', 'Cerrar');
      }
    });
  }

  function handleShow(e) {
    e.preventDefault();
    setShow(!show);
  }

  // --- Mejoras en estilos de botones ---

  const botonCerrarSesion = (
    <form onSubmit={handleSubmit2} className="d-flex justify-content-center my-3">
    <button
        type="submit"
        className="btn-cerrar-sesion"
    >
    Cerrar sesión
    </button>
</form>
  );

  if (user || admin) {
    return botonCerrarSesion;
  }

  if (!user && show) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <form onSubmit={iniciarSesionEmailPass} className="p-4 border rounded shadow w-50" style={{ maxWidth: '400px' }}>
          <h2>Iniciar sesión con Email y contraseña</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              type="email"
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="form-control"
              required
            />
          </div>
          {/* Botones mejorados con estilo uniforme y espaciado */}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-2"
            style={{ fontWeight: '600' }}
          >
            Ingresar
          </button>
          <button
            style={{ marginBottom: '8px' }}
            className="btn btn-secondary w-100"
            onClick={handleShow}
            type="button"
          >
            Registrate
          </button>
          <button
            className="btn btn-secondary w-100"
            onClick={logInGmail}
            type="button"
          >
            Iniciar sesión con Gmail
          </button>
        </form>
      </div>
    );
  }

  if (!user && !show) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <form onSubmit={registrarUsuario} className="p-4 border rounded shadow w-50" style={{ maxWidth: '400px' }}>
          <h2>Registrarse</h2>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-success w-100"
            style={{ fontWeight: '600' }}
          >
            Registrarse
          </button>
        </form>
        <button
          style={{ marginTop: '8px', maxWidth: '400px' }}
          className="btn btn-link"
          onClick={handleShow}
          type="button"
        >
          Iniciar Sesión
        </button>
      </div>
    );
  }
}

export default Login2;
