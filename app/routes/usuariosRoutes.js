module.exports = app => {
    const usuariosController = require('../controllers/usuarios.controllers');

    var router = require("express").Router();

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

    app.use('/api/usuarios', router);
};