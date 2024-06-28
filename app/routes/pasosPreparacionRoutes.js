module.exports = app => {
    const pasosPreparacionController = require('../controllers/pasosPreparacion.controllers');

    var router = require("express").Router();

    // Crear un nuevo Paso de Preparación
    router.post("/", pasosPreparacionController.create);

    // Recuperar todos los Pasos de Preparación de una Receta específica
    router.get("/receta/:receta_id", pasosPreparacionController.findAllByRecetaId);

    // Recuperar un Paso de Preparación por id
    router.get("/:id", pasosPreparacionController.findOne);

    // Actualizar un Paso de Preparación por id
    router.put("/:id", pasosPreparacionController.update);

    // Eliminar un Paso de Preparación por id
    router.delete("/:id", pasosPreparacionController.delete);

    app.use('/api/pasospreparacion', router);
};