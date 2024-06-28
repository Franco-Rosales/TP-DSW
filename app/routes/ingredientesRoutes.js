module.exports = app => {
    const ingredientesController = require('../controllers/ingredientes.controllers');

    var router = require("express").Router();

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

    app.use('/api/ingredientes', router);
};