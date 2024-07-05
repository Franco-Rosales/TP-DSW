const express = require('express');
const router = express.Router();
const dificultadesController = require('../controllers/dificultadesController');

// Crear una nueva dificultad
router.post("/", dificultadesController.create);

// Recuperar todas las dificultades
router.get("/", dificultadesController.findAll);

// Recuperar una dificultad por id
router.get("/:id", dificultadesController.findOne);

// Actualizar una dificultad por id
router.put("/:id", dificultadesController.update);

// Eliminar una dificultad por id
router.delete("/:id", dificultadesController.delete);

module.exports = router;