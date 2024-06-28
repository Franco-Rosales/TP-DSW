module.exports = app => {
    const valoracionesController = require('../controllers/valoraciones.controllers');

    var router = require("express").Router();

    // Crear una nueva valoración
    router.post("/", valoracionesController.create);

    // Recuperar todas las valoraciones
    router.get("/", valoracionesController.findAll);

    // Recuperar una valoración por id
    router.get("/:id", valoracionesController.findOne);

    // Actualizar una valoración por id
    router.put("/:id", valoracionesController.update);

    // Eliminar una valoración por id
    router.delete("/:id", valoracionesController.delete);

    app.use('/api/valoraciones', router);
};