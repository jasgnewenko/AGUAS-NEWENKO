import React from 'react';

export default function AppPrincipal() {
  return (
    <div style={{ fontFamily: 'Arial', padding: '2rem' }}>
      <h1>Aguas Newenko</h1>
      <nav style={{ marginTop: '1rem', marginBottom: '2rem' }}>
        <button style={{ marginRight: '1rem' }}>📊 Confrontación de Ventas</button>
        <button style={{ marginRight: '1rem' }}>💵 Finanzas</button>
        <button style={{ marginRight: '1rem' }}>🚚 Reparto</button>
        <button>📦 Pedidos</button>
      </nav>

      <section>
        <h2>Bienvenido a la plataforma de gestión interna</h2>
        <p>Selecciona una opción para comenzar.</p>
      </section>
    </div>
  );
}
