const express = require('express');
const router = express.Router();
const ingredientesController = require('../controllers/ingredientesController');

    // Crear un nuevo ingrediente
router.post("/", ingredientesController.create);

    // Recuperar todos los ingredientes
router.get("/", ingredientesController.findAll);

    // Recuperar un ingrediente por id
router.get("/:id", ingredientesController.findOne);

    // Actualizar un ingrediente por id
router.put("/:id", ingredientesController.update);

    // Eliminar un ingrediente por id
router.delete("/:id", ingredientesController.delete);

module.exports = router;