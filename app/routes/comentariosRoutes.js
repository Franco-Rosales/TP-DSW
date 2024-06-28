const express = require('express');
const router = express.Router();
const comentariosController = require('../controllers/comentariosControllers');

    // Crear un nuevo comentario
router.post("/", comentariosController.create);

    // Recuperar todos los comentarios
router.get("/", comentariosController.findAll);

    // Recuperar un comentario por id
router.get("/:id", comentariosController.findOne);

    // Actualizar un comentario por id
router.put("/:id", comentariosController.update);

    // Eliminar un comentario por id
router.delete("/:id", comentariosController.delete);

module.exports = router;