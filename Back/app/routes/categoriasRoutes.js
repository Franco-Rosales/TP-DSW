const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');

    // Crear una nueva categoría
router.post("/", categoriasController.create);

    // Recuperar todas las categorías
router.get("/", categoriasController.findAll);

    // Recuperar una categoría por id
router.get("/:id", categoriasController.findOne);

    // Actualizar una categoría por id
router.put("/:id", categoriasController.update);

    // Eliminar una categoría por id
router.delete("/:id", categoriasController.delete);

module.exports = router;
