const express = require('express');
const router = express.Router();
const recetasController = require('../controllers/recetasController');


    // Crear una nueva receta
router.post("/", recetasController.create);

    // Recuperar todas las recetas
router.get("/", recetasController.findAll);

    // Recuperar una receta por id
router.get("/:id", recetasController.findOne);

    // Actualizar una receta por id
router.put("/:id", recetasController.update);

    // Eliminar una receta por id
router.delete("/:id", recetasController.delete);

module.exports = router;