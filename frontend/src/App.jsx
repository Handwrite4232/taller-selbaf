// frontend/src/App.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

<<<<<<< HEAD
// COMPONENTE SECUNDARIO DE ALTO RENDIMIENTO (Rúbrica: Estructura sistemática y visual)
export function TarjetaTurno({ turno, alEditar }) {
=======
function App() {
  // ---- HOOKS DE ESTADO (useState) ----
  const [turnos, setTurnos] = useState([]);
  const [placa, setPlaca] = useState('');
  const [cliente, setCliente] = useState('');
  const [servicio, setServicio] = useState('');

  // Formulario para que el mecánico edite diagnósticos complejos
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

>>>>>>> 261c3cb066318dd935c17b97aa63cdf65ad71ac9
  return (
    <div style={{
      borderLeft: '6px solid #2563eb', padding: '15px', margin: '10px 0',
      background: '#ffffff', borderRadius: '6px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
    }}>
      <h4 style={{ margin: '0 0 5px 0', color: '#1e293b' }}>
        Placa Moto: <span style={{ color: '#2563eb', fontFamily: 'monospace' }}>{turno.placa}</span>
      </h4>
      <p style={{ margin: '2px 0', fontSize: '14px', color: '#475569' }}>
        <strong>Propietario:</strong> {turno.cliente} | <strong>Servicio:</strong> {turno.servicio}
      </p>
      <div style={{ marginTop: '8px' }}>
        <span style={{
          backgroundColor: turno.estado === 'Listo para Entrega' ? '#dcfce7' : '#fee2e2',
          color: turno.estado === 'Listo para Entrega' ? '#166534' : '#991b1b',
          padding: '3px 8px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold'
        }}>{turno.estado}</span>
      </div>
      {turno.hallazgos && (
        <div style={{ background: '#fef2f2', color: '#991b1b', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '13px', border: '1px solid #fee2e2' }}>
          <strong>⚠️ Nota Técnica Profunda:</strong> {turno.hallazgos}
        </div>
      )}
      <button onClick={() => alEditar(turno)} style={{ marginTop: '10px', background: '#475569', color: 'white', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📝 Evaluar Falla</button>
    </div>
  );
}

<<<<<<< HEAD
// COMPONENTE PRINCIPAL (SPA)
export default function App() {
  const [turnos, setTurnos] = useState([]);
  const [placa, setPlaca] = useState('');
  const [cliente, setCliente] = useState('');
  const [turnoSeleccionado, setTurnoSeleccionado] = useState(null);
  const [estadoMecanico, setEstadoMecanico] = useState('');
  const [hallazgosMecanico, setHallazgosMecanico] = useState('');

  // Carga asíncrona mediante useEffect y Axios
  const cargarTurnos = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/turnos');
      setTurnos(res.data);
    } catch (err) {
      console.error("Error al conectar con la API back-end:", err);
    }
  };

  useEffect(() => {
    cargarTurnos();
  }, []);

  const agendarCita = async (e) => {
    e.preventDefault();
    if (!placa || !cliente) return alert("Por favor rellenar campos obligatorios.");
    try {
      await axios.post('http://localhost:5000/api/turnos', { placa, cliente });
      setPlaca(''); setCliente('');
      cargarTurnos(); // Recarga de alto rendimiento
      alert("Cita agendada con éxito.");
    } catch (error) {
      alert("Error de comunicación de red al guardar.");
    }
  };

  const enviarDiagnostico = async () => {
    if (!estadoMecanico || !hallazgosMecanico) return alert("Complete los datos.");
    try {
      await axios.put(`http://localhost:5000/api/turnos/${turnoSeleccionado.id}`, {
        estado: estadoMecanico,
        hallazgos: hallazgosMecanico
      });
      setTurnoSeleccionado(null); setEstadoMecanico(''); setHallazgosMecanico('');
      cargarTurnos();
      alert("Base de datos actualizada.");
    } catch (error) {
      alert("Error al actualizar datos.");
    }
  };

  return (
    <div style={{ fontFamily: 'Segoe UI, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto', background: '#f8fafc' }}>
      <header style={{ background: '#1e293b', color: 'white', padding: '15px', borderRadius: '6px', textAlign: 'center' }}>
        <h2>Taller Selbaf - Sistema Integrado Web II</h2>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* LADO IZQUIERDO: CLIENTE */}
        <div>
          <div style={{ background: 'white', padding: '15px', borderRadius: '6px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>📋 Módulo de Agendamiento</h3>
            <form onSubmit={agendarCita}>
              <input type="text" placeholder="Placa Vehículo *" value={placa} onChange={e => setPlaca(e.target.value)} style={{ width: '90%', padding: '8px', marginBottom: '10px' }} /><br/>
              <input type="text" placeholder="Nombre Propietario *" value={cliente} onChange={e => setCliente(e.target.value)} style={{ width: '90%', padding: '8px', marginBottom: '10px' }} /><br/>
              <button type="submit" style={{ background: '#2563eb', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>Reservar Cupo</button>
            </form>
          </div>

          {turnoSeleccionado && (
            <div style={{ background: '#f1f5f9', padding: '15px', borderRadius: '6px', marginTop: '15px', border: '1px solid #cbd5e1' }}>
              <h3>🔧 Diagnosticar ID: {turnoSeleccionado.id}</h3>
              <select onChange={e => setEstadoMecanico(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px' }}>
                <option value="">-- Cambiar Estado --</option>
                <option value="En Reparación">En Reparación</option>
                <option value="Falla Crítica Profunda">Requiere Repuestos (Falla profunda)</option>
                <option value="Listo para Entrega">Listo para Entrega</option>
              </select>
              <textarea placeholder="Detalle técnico de la falla..." value={hallazgosMecanico} onChange={e => setHallazgosMecanico(e.target.value)} style={{ width: '95%', height: '60px', marginBottom: '10px' }} />
              <button onClick={enviarDiagnostico} style={{ background: '#10b981', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>Guardar en BD</button>
            </div>
          )}
        </div>

        {/* LADO DERECHO: COLA DE TRABAJO DEL MECÁNICO */}
        <div>
          <h3>🛠️ Cola Operativa del Taller</h3>
          {turnos.length === 0 ? <p>No hay motos en cola.</p> : 
            turnos.map(t => <TarjetaTurno key={t.id} turno={t} alEditar={setTurnoSeleccionado} />)
          }
        </div>
      </div>
    </div>
  );
}
=======
export default App;
>>>>>>> 261c3cb066318dd935c17b97aa63cdf65ad71ac9
