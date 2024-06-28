const db = require('../db/setup');
const RecetasCategorias = db.recetasCategorias;
const { Op } = require('sequelize');

// Asignar una categoría a una receta
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.receta_id || !req.body.categoria_id) {
        res.status(400).send({
            message: "Los campos receta_id y categoria_id son requeridos."
        });
        return;
    }

    // Crear la relación entre receta y categoría
    const recetaCategoria = {
        receta_id: req.body.receta_id,
        categoria_id: req.body.categoria_id
    };

    // Guardar la relación en la base de datos
    RecetasCategorias.create(recetaCategoria)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al asignar la categoría a la receta."
            });
        });
};

// Recuperar todas las relaciones de receta y categoría
exports.findAll = (req, res) => {
    RecetasCategorias.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las relaciones de receta y categoría."
            });
        });
};

// Recuperar una relación de receta y categoría por id de receta
exports.findOneByRecetaId = (req, res) => {
    const receta_id = req.params.receta_id;

    RecetasCategorias.findAll({ where: { receta_id: receta_id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la relación de receta y categoría con receta_id=" + receta_id
            });
        });
};

// Eliminar una relación de receta y categoría por receta_id y categoria_id
exports.delete = (req, res) => {
    const receta_id = req.params.receta_id;
    const categoria_id = req.params.categoria_id;

    RecetasCategorias.destroy({
        where: { receta_id: receta_id, categoria_id: categoria_id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La relación de receta y categoría se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la relación de receta y categoría con receta_id=${receta_id} y categoria_id=${categoria_id}`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar la relación de receta y categoría con receta_id=" + receta_id + " y categoria_id=" + categoria_id
            });
        });
};