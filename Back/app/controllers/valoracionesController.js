const db = require('../db/setup');
const Valoraciones = db.valoraciones;
const { Op } = require('sequelize');

// Crear una nueva valoración
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.valor || !req.body.usuario_id || !req.body.receta_id) {
        res.status(400).send({
            message: "Los campos valor, usuario_id y receta_id son requeridos."
        });
        return;
    }

    // Crear la valoración
    const valoracion = {
        valor: req.body.valor,
        usuario_id: req.body.usuario_id,
        receta_id: req.body.receta_id
    };

    // Guardar la valoración en la base de datos
    Valoraciones.create(valoracion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la valoración."
            });
        });
};

// Recuperar todas las valoraciones
exports.findAll = (req, res) => {
    Valoraciones.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las valoraciones."
            });
        });
};

// Recuperar una valoración por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Valoraciones.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la valoración con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la valoración con id=" + id
            });
        });
};

// Actualizar una valoración por id
exports.update = (req, res) => {
    const id = req.params.id;

    Valoraciones.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La valoración se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la valoración con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la valoración con id=" + id
            });
        });
};

// Eliminar una valoración por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Valoraciones.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La valoración se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la valoración con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar la valoración con id=" + id
            });
        });
};