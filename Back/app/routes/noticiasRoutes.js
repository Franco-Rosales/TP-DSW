const express = require('express');
const router = express.Router();
const noticiasController = require('../controllers/noticiasController');

// Rutas para las noticias
router.post("/", noticiasController.create); // Crear una nueva noticia
router.get("/", noticiasController.findAll); // Obtener todas las noticias
router.get("/:id", noticiasController.findOne); // Obtener una noticia por ID
router.put("/:id", noticiasController.update); // Actualizar una noticia por ID
router.delete("/:id", noticiasController.delete); // Eliminar una noticia por ID

module.exports = router;