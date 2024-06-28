module.exports = app => {
    const recetasController = require('../controllers/recetas.controllers');

    var router = require("express").Router();

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

    app.use('/api/recetas', router);
};