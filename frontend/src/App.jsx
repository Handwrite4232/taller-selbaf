// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';

function App() {
  // ---- HOOKS DE ESTADO (useState) ----
  const [turnos, setTurnos] = useState([]);
  const [placa, setPlaca] = useState('');
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('');

  // Formulario para que el mecánico edite diagnósticos complejos ("Algo más profundo")
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [detallesHallazgo, setDetallesHallazgo] = useState('');

  // ---- HOOK DE EFECTO (useEffect) ----
  // Simula Axios cargando los datos del servidor de manera asíncrona al abrir la app
  useEffect(() => {
    // Aquí iría: axios.get('/api/turnos').then(...)
    // Usamos datos simulados integrados para que compile inmediatamente sin configurar proxies externos
    setTurnos([
      { id: 1, placa: "XYZ-123", cliente: "Juan Pérez", servicio: "Cambio de aceite", estado: "En diagnóstico", hallazgos: "" },
      { id: 2, placa: "ABC-789", cliente: "Maria Gomez", servicio: "Mantenimiento general", estado: "Recibida", hallazgos: "" }
    ]);
  }, []);

  // Función para manejar el envío del formulario del cliente (Agendamiento)
  const manejarAgendamiento = (e) => {
    e.preventDefault();
    if (!placa || !cliente || !servicio) return alert("Por favor llene todos los campos");

    const nuevaCita = {
      id: turnos.length + 1,
      placa,
      cliente,
      servicio,
      estado: "Recibida",
      hallazgos: ""
    };

    setTurnos([...turnos, nuevaCita]); // Actualiza la UI instantáneamente
    setPlaca(''); setCliente(''); setServicio('');
    alert("¡Turno agendado con éxito!");
  };

  // Función para guardar actualizaciones técnicas profundas encontradas por el mecánico
  const guardarDiagnosticoMecanico = (id) => {
    setTurnos(turnos.map(turno => 
      turno.id === id ? { ...turno, estado: nuevoEstado, hallazgos: detallesHallazgo } : turno
    ));
    setIdSeleccionado(null);
    setDetallesHallazgo('');
    alert("Diagnóstico crítico guardado e informado al cliente.");
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ backgroundColor: '#1e293b', color: 'white', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
        <h1>Taller de Motocicletas "Selbaf" - Gestión Web II</h1>
      </header>

      <main style={{ marginTop: '20px' }}>
        
        {/* VISTA 1: FORMULARIO DE AGENDAMIENTO PARA EL CLIENTE */}
        <section style={{ background: '#f8fafc', padding: '20px', borderRadius: '8px', marginBottom: '25px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2>📋 Agendar Turno de Servicio (Vista Cliente)</h2>
          <form onSubmit={manejarAgendamiento} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input type="text" placeholder="Placa de la Moto" value={placa} onChange={(e) => setPlaca(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            <input type="text" placeholder="Nombre del Propietario" value={cliente} onChange={(e) => setCliente(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            <input type="text" placeholder="Servicio Requerido" value={servicio} onChange={(e) => setServicio(e.target.value)} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #cbd5e1' }} />
            <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' }}>Reservar Cita</button>
          </form>
        </section>

        {/* VISTA 2: TABLERO DE TRABAJO (COLA DE TAREAS) PARA EL MECÁNICO */}
        <section style={{ background: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2>🛠️ Panel Operativo y Cola de Turnos (Vista Mecánico)</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Ordene y actualice los servicios prioritarios de los vehículos ingresados.</p>
          
          <div style={{ display: 'grid', gap: '15px', marginTop: '15px' }}>
            {turnos.map((turno) => (
              <div key={turno.id} style={{ borderLeft: '5px solid #10b981', padding: '15px', background: '#f1f5f9', borderRadius: '4px' }}>
                <h4 style={{ margin: '0 0 5px 0' }}>Moto Placa: <span style={{ color: '#2563eb' }}>{turno.placa}</span></h4>
                <p style={{ margin: '0' }}><strong>Cliente:</strong> {turno.cliente} | <strong>Servicio Inicial:</strong> {turno.servicio}</p>
                <p style={{ margin: '5px 0' }}><strong>Estado:</strong> <span style={{ padding: '3px 8px', background: '#cbd5e1', borderRadius: '12px', fontSize: '12px' }}>{turno.estado}</span></p>
                
                {/* Muestra si el mecánico detectó una falla profunda */}
                {turno.hallazgos && (
                  <div style={{ background: '#fee2e2', color: '#991b1b', padding: '10px', borderRadius: '4px', marginTop: '5px', fontSize: '14px' }}>
                    <strong>⚠️ Hallazgo Técnico Profundo:</strong> {turno.hallazgos}
                  </div>
                )}

                {/* Zona de edición para interactuar con los Hooks */}
                {idSeleccionado === turno.id ? (
                  <div style={{ marginTop: '10px', background: '#fff', padding: '10px', borderRadius: '4px', border: '1px solid #cbd5e1' }}>
                    <label>Nuevo Estado: </label>
                    <select onChange={(e) => setNuevoEstado(e.target.value)} style={{ padding: '5px', marginRight: '10px' }}>
                      <option value="">--Seleccionar--</option>
                      <option value="En Reparación">En Reparación</option>
                      <option value="Requiere Aprobación de Repuestos">Requiere Aprobación (Falla profunda)</option>
                      <option value="Listo para Entrega">Listo para Entrega</option>
                    </select>
                    <br/><br/>
                    <textarea placeholder="Escriba los hallazgos críticos detectados en la motocicleta..." value={detallesHallazgo} onChange={(e) => setDetallesHallazgo(e.target.value)} style={{ width: '100%', height: '50px', padding: '5px' }} />
                    <button onClick={() => guardarDiagnosticoMecanico(turno.id)} style={{ background: '#10b981', color: 'white', border: 'none', padding: '5px 10px', marginTop: '5px', borderRadius: '4px', cursor: 'pointer' }}>Guardar Cambios</button>
                  </div>
                ) : (
                  <button onClick={() => { setIdSeleccionado(turno.id); setNuevoEstado(turno.estado); }} style={{ marginTop: '10px', background: '#475569', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📝 Modificar Diagnóstico / Estado</button>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

export default App;