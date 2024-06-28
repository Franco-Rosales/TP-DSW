const db = require('../db/setup');
const IngredientesRecetasMedidas = db.ingredientesRecetasMedidas;
const { Op } = require('sequelize');

// Crear y guardar una nueva relación Ingrediente-Receta-Medida
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.ingrediente_id || !req.body.receta_id || !req.body.medida_id || !req.body.cantidad) {
        res.status(400).send({
            message: "El ingrediente_id, receta_id, medida_id y cantidad no pueden estar vacíos!"
        });
        return;
    }

    // Crear la relación
    const ingredienteRecetaMedida = {
        ingrediente_id: req.body.ingrediente_id,
        receta_id: req.body.receta_id,
        medida_id: req.body.medida_id,
        cantidad: req.body.cantidad
    };

    // Guardar la relación en la base de datos
    IngredientesRecetasMedidas.create(ingredienteRecetaMedida)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la relación Ingrediente-Receta-Medida."
            });
        });
};

// Recuperar todas las relaciones Ingrediente-Receta-Medida de la base de datos
exports.findAll = (req, res) => {
    IngredientesRecetasMedidas.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las relaciones Ingrediente-Receta-Medida."
            });
        });
};

// Recuperar una relación Ingrediente-Receta-Medida por id
exports.findOne = (req, res) => {
    const { ingrediente_id, receta_id, medida_id } = req.params;

    IngredientesRecetasMedidas.findOne({
        where: { ingrediente_id, receta_id, medida_id }
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la relación con ingrediente_id=${ingrediente_id}, receta_id=${receta_id}, medida_id=${medida_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la relación con ingrediente_id=" + ingrediente_id + ", receta_id=" + receta_id + ", medida_id=" + medida_id
            });
        });
};

// Actualizar una relación Ingrediente-Receta-Medida por id
exports.update = (req, res) => {
    const { ingrediente_id, receta_id, medida_id } = req.params;

    IngredientesRecetasMedidas.update(req.body, {
        where: { ingrediente_id, receta_id, medida_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La relación Ingrediente-Receta-Medida se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la relación con ingrediente_id=${ingrediente_id}, receta_id=${receta_id}, medida_id=${medida_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la relación con ingrediente_id=" + ingrediente_id + ", receta_id=" + receta_id + ", medida_id=" + medida_id
            });
        });
};

// Eliminar una relación Ingrediente-Receta-Medida por id
exports.delete = (req, res) => {
    const { ingrediente_id, receta_id, medida_id } = req.params;

    IngredientesRecetasMedidas.destroy({
        where: { ingrediente_id, receta_id, medida_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La relación Ingrediente-Receta-Medida se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar la relación con ingrediente_id=${ingrediente_id}, receta_id=${receta_id}, medida_id=${medida_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo borrar la relación con ingrediente_id=" + ingrediente_id + ", receta_id=" + receta_id + ", medida_id=" + medida_id
            });
        });
};