const express = require('express');
const router = express.Router();
const medidasController = require('../controllers/medidasControllers');

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

module.exports = router;