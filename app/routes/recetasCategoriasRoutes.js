const express = require('express');
const router = express.Router();
const recetasCategoriasController = require('../controllers/recetasCategoriasController');

    // Asignar una categoría a una receta
router.post("/", recetasCategoriasController.create);

    // Recuperar todas las relaciones de receta y categoría
router.get("/", recetasCategoriasController.findAll);

    // Recuperar una relación de receta y categoría por id de receta
router.get("/:receta_id", recetasCategoriasController.findOneByRecetaId);

    // Eliminar una relación de receta y categoría por receta_id y categoria_id
router.delete("/:receta_id/:categoria_id", recetasCategoriasController.delete);

module.exports = router;