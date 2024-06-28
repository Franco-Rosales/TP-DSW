module.exports = app => {
    const medidasController = require('../controllers/medidas.controllers');

    var router = require("express").Router();

    // Crear una nueva Medida
    router.post("/", medidasController.create);

    // Recuperar todas las Medidas
    router.get("/", medidasController.findAll);

    // Recuperar una Medida por id
    router.get("/:id", medidasController.findOne);

    // Actualizar una Medida por id
    router.put("/:id", medidasController.update);

    // Eliminar una Medida por id
    router.delete("/:id", medidasController.delete);

    app.use('/api/medidas', router);
};