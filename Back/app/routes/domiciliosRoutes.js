const express = require('express');
const router = express.Router();
const domiciliosController = require('../controllers/domiciliosController');

    // Crear un domicilio
router.post("/", domiciliosController.create);

// Recuperar todas las dificultades
router.get("/", domiciliosController.findAll);

    // Recuperar un domicilio por id
router.get("/:id", domiciliosController.findOne);

    // Actualizar un domicilio por id
router.put("/:id", domiciliosController.update);

    // Eliminar un domicilio por id
router.delete("/:id", domiciliosController.delete);

module.exports = router;