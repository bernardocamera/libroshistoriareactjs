import React, { useState } from "react";

function About() {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        padding: "20px 40px",
        maxWidth: "100vw",
        margin: "0 auto",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <h2>Libros Historia</h2>

      <img
        src="../imagenes/historiauniversal.png"
        alt="Historia"
        style={{
          maxWidth: "200px",
          height: "auto",
          marginBottom: "20px",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          border: "1.5px solid white",
          borderRadius: "15px",
          boxShadow: hover
            ? "0 10px 20px rgba(0,0,0,0.3)"
            : "0 0 8px rgba(0,0,0,0.2)",
          cursor: "pointer",
          transform: hover ? "translateY(-10px)" : "translateY(0)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />

      <p>
        Bienvenido a nuestra tienda de libros especializada en Historia Universal.
        Aquí encontrarás obras clásicas y contemporáneas que exploran desde las primeras civilizaciones
        hasta los eventos más relevantes del mundo moderno.
      </p>
      <p>
        Nuestro objetivo es fomentar el conocimiento histórico y facilitar el acceso
        a materiales cuidadosamente seleccionados para todos los amantes de la historia.
      </p>
    </section>
  );
}

export default About;
