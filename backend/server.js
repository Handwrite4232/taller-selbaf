// backend/server.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

// Base de datos en memoria 
let turnos = [
  { id: 1, placa: "XYZ-123", cliente: "Juan Pérez", servicio: "Cambio de aceite", estado: "En diagnóstico", hallazgos: "" },
  { id: 2, placa: "ABC-789", cliente: "Maria Gomez", servicio: "Mantenimiento general", estado: "Recibida", hallazgos: "" }
];

// Documentación Swagger
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión Taller Selbaf",
    version: "1.0.0",
    description: "Endpoints para controlar el agendamiento y los diagnósticos mecánicos de motocicletas."
  },
  paths: {
    "/api/turnos": {
      get: {
        summary: "Obtener todos los turnos del taller",
        responses: { "200": { description: "Lista de turnos obtenida con éxito." } }
      },
      post: {
        summary: "Crear un nuevo turno (Agendamiento)",
        requestBody: {
          content: { "application/json": { schema: { type: "object", properties: { placa: { type: "string" }, cliente: { type: "string" }, servicio: { type: "string" } } } } }
        },
        responses: { "201": { description: "Turno creado exitosamente." } }
      }
    }
  }
};

// Ruta para la interfaz gráfica 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ---- ENDPOINTS DE LA API REST ----

// 1. GET: Obtener todos los turnos (Usado por el Mecánico para ver su cola de trabajo)
app.get('/api/turnos', (req, res) => {
  res.json(turnos);
});

// 2. POST: Crear una nueva cita (Usado por el Cliente en el formulario de agendamiento)
app.post('/api/turnos', (req, res) => {
  const { placa, cliente, servicio } = req.body;
  const nuevoTurno = {
    id: turnos.length + 1,
    placa,
    cliente,
    servicio,
    estado: "Recibida",
    hallazgos: ""
  };
  turnos.push(nuevoTurno);
  res.status(201).json(nuevoTurno);
});

// 3. PUT/PATCH: Actualizar diagnóstico profundo (Usado por el mecánico en tiempo real)
app.put('/api/turnos/:id', (req, res) => {
  const { id } = req.params;
  const { estado, hallazgos } = req.body;
  
  const turno = turnos.find(t => t.id === parseInt(id));
  if (!turno) return res.status(404).json({ mensaje: "Turno no encontrado" });

  turno.estado = estado;
  turno.hallazgos = hallazgos;

  res.json({ mensaje: "Diagnóstico técnico actualizado", turno });
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación de Swagger disponible en http://localhost:${PORT}/api-docs`);
});
