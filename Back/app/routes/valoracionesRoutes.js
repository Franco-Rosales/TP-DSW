const express = require('express');
const router = express.Router();
const valoracionesController = require('../controllers/valoracionesController');

// Crear una nueva valoración
router.post("/", valoracionesController.create);

// Recuperar todas las valoraciones
router.get("/", valoracionesController.findAll);

// Recuperar una valoración por id
router.get("/:id", valoracionesController.findOne);

// Actualizar una valoración por id
router.put("/:id", valoracionesController.update);

// Eliminar una valoración por id
router.delete("/:id", valoracionesController.delete);

module.exports = router;