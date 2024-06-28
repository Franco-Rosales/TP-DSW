const express = require('express');
const router = express.Router();
const ingredientesRecetasMedidasController = require('../controllers/ingredientesRecetasMedidasController');

    // Crear una nueva relación Ingrediente-Receta-Medida
router.post("/", ingredientesRecetasMedidasController.create);

    // Recuperar todas las relaciones Ingrediente-Receta-Medida
router.get("/", ingredientesRecetasMedidasController.findAll);

    // Recuperar una relación Ingrediente-Receta-Medida por ids
router.get("/:ingrediente_id/:receta_id/:medida_id", ingredientesRecetasMedidasController.findOne);

    // Actualizar una relación Ingrediente-Receta-Medida por ids
router.put("/:ingrediente_id/:receta_id/:medida_id", ingredientesRecetasMedidasController.update);

    // Eliminar una relación Ingrediente-Receta-Medida por ids
router.delete("/:ingrediente_id/:receta_id/:medida_id", ingredientesRecetasMedidasController.delete);

module.exports = router;
