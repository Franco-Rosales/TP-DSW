module.exports = app => {
    const categoriasController = require('../controllers/categorias.controllers');

    var router = require("express").Router();

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

    app.use('/api/categorias', router);
};