import React, { useState } from 'react';

function Seccion({ titulo, contenido }) {
  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>{titulo}</h2>
      <p>{contenido}</p>
    </div>
  );
}

export default function AppPrincipal() {
  const [vista, setVista] = useState('inicio');

  const vistas = {
    inicio: <Seccion titulo="Inicio" contenido="Bienvenido a la plataforma de gestión interna de Aguas Newenko." />,
    ventas: <Seccion titulo="Ventas" contenido="Estadísticas de ventas semanales, mensuales y anuales." />,
    finanzas: <Seccion titulo="Finanzas" contenido="Registro de ingresos, egresos y balances automáticos." />,
    pedidos: <Seccion titulo="Pedidos" contenido="Gestión de pedidos y seguimiento de entregas." />,
    reportes: <Seccion titulo="Reportes" contenido="Exportación y envío automático de reportes financieros." />
  };

  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1>Aguas Newenko</h1>
      <nav style={{ margin: '1rem 0' }}>
        {Object.keys(vistas).map((key) => (
          <button key={key} onClick={() => setVista(key)} style={{ marginRight: '1rem' }}>
            {vistas[key].props.titulo}
          </button>
        ))}
      </nav>
      {vistas[vista]}
    </div>
  );
}
