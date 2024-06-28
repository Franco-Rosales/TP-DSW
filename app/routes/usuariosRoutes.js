const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

    // Crear un nuevo usuario
router.post("/", usuariosController.create);

    // Recuperar todos los usuarios
router.get("/", usuariosController.findAll);

    // Recuperar un usuario por id
router.get("/:id", usuariosController.findOne);

    // Actualizar un usuario por id
router.put("/:id", usuariosController.update);

    // Eliminar un usuario por id
router.delete("/:id", usuariosController.delete);

module.exports = router;