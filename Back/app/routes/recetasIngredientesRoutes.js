const express = require('express');
const router = express.Router();
const recetaIngredienteController = require('../controllers/recetaIngredientesController');

router.post('/', recetaIngredienteController.create);

router.get('/', recetaIngredienteController.findAll);

router.get('/:id', recetaIngredienteController.findOne);

router.put('/:id', recetaIngredienteController.update);

router.delete('/:id', recetaIngredienteController.delete);

module.exports = router;