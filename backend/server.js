// backend/server.js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors'); // Para permitir conectar con el frontend sin bloqueos

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = path.join(__dirname, 'data', 'turnos.json');

<<<<<<< HEAD
app.use(cors());
app.use(express.json());

// Estructura de Swagger conforme al informe
=======

app.use(express.json());

// Base de datos en memoria 
let turnos = [
  { id: 1, placa: "XYZ-123", cliente: "Juan Pérez", servicio: "Cambio de aceite", estado: "En diagnóstico", hallazgos: "" },
  { id: 2, placa: "ABC-789", cliente: "Maria Gomez", servicio: "Mantenimiento general", estado: "Recibida", hallazgos: "" }
];

// Documentación Swagger
>>>>>>> 261c3cb066318dd935c17b97aa63cdf65ad71ac9
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Gestión Taller Selbaf",
    version: "1.0.0",
    description: "Endpoints interactivos para el control de agendamiento y diagnóstico de motocicletas."
  },
  paths: {
    "/api/turnos": {
      get: {
        summary: "Obtener todos los turnos del taller",
        responses: {
          "200": { description: "Lista obtenida con éxito." },
          "500": { description: "Error interno en la base de datos." }
        }
      },
      post: {
        summary: "Registrar un nuevo turno",
        responses: {
          "201": { description: "Turno creado." },
          "400": { description: "Datos incompletos." }
        }
      }
    }
  }
};
<<<<<<< HEAD
=======

// Ruta para la interfaz gráfica 
>>>>>>> 261c3cb066318dd935c17b97aa63cdf65ad71ac9
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 1. GET con detección de errores
app.get('/api/turnos', async (req, res) => {
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    res.json(JSON.parse(data));
  } catch (error) {
    console.error("Error al leer la base de datos:", error);
    res.status(500).json({ error: "Error interno al leer la base de datos." });
  }
});

// 2. POST con validación de datos estructurales
app.post('/api/turnos', async (req, res) => {
  try {
    const { placa, cliente, servicio } = req.body;
    if (!placa || !cliente) {
      return res.status(400).json({ error: "Datos incompletos: 'placa' y 'cliente' son obligatorios." });
    }

    const data = await fs.readFile(DB_PATH, 'utf-8');
    const turnos = JSON.parse(data);

    const nuevoTurno = {
      id: turnos.length > 0 ? turnos[turnos.length - 1].id + 1 : 1,
      placa,
      cliente,
      servicio: servicio || "Revisión General",
      estado: "En Espera",
      hallazgos: ""
    };

    turnos.push(nuevoTurno);
    await fs.writeFile(DB_PATH, JSON.stringify(turnos, null, 2));
    res.status(201).json({ mensaje: "Turno agendado", turno: nuevoTurno });
  } catch (error) {
    res.status(500).json({ error: "Error interno al guardar en la base de datos." });
  }
});

// 3. PUT con control estricto de excepciones
app.put('/api/turnos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, hallazgos } = req.body;

    if (!estado || !hallazgos) {
      return res.status(400).json({ error: "Campos 'estado' y 'hallazgos' requeridos." });
    }

    const data = await fs.readFile(DB_PATH, 'utf-8');
    const turnos = JSON.parse(data);
    
    const index = turnos.findIndex(t => t.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Turno no encontrado." });

    turnos[index].estado = estado;
    turnos[index].hallazgos = hallazgos;

    await fs.writeFile(DB_PATH, JSON.stringify(turnos, null, 2));
    res.json({ mensaje: "Modificación guardada con éxito", turno: turnos[index] });
  } catch (error) {
    res.status(500).json({ error: "Error de persistencia al actualizar." });
  }
});

<<<<<<< HEAD
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));
=======
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Documentación de Swagger disponible en http://localhost:${PORT}/api-docs`);
});
>>>>>>> 261c3cb066318dd935c17b97aa63cdf65ad71ac9
