const express = require('express');
const router = express.Router();
const contactoController = require('../controllers/contactoController');

    // Crear una nueva Medida
router.post("/", contactoController.create);

    // Recuperar todas las Medidas
router.get("/", contactoController.findAll);

    // Recuperar una Medida por id
router.get("/:id", contactoController.findOne);

    // Actualizar una Medida por id
router.put("/:id", contactoController.update);

    // Eliminar una Medida por id
router.delete("/:id", contactoController.delete);

module.exports = router;