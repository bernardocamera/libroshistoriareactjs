import { useState } from "react";

function Contacto() {
  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formulario);

    setEnviado(true);
    setFormulario({
      nombre: "",
      email: "",
      mensaje: "",
    });
  };

  return (
    <section
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Contacto</h2>

      {enviado && (
        <p style={{ color: "green", marginBottom: "15px" }}>
          ¡Gracias por tu mensaje!
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px", textAlign: "left" }}>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formulario.nombre}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px", textAlign: "left" }}>
          Email:
          <input
            type="email"
            name="email"
            value={formulario.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "10px", textAlign: "left" }}>
          Mensaje:
          <textarea
            name="mensaje"
            value={formulario.mensaje}
            onChange={handleChange}
            required
            rows={4}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "5px",
              resize: "vertical",
            }}
          ></textarea>
        </label>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
        >
          Enviar
        </button>
      </form>
    </section>
  );
}

export default Contacto;
