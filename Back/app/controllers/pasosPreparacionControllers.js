const db = require('../db/setup');
const PasosPreparacion = db.pasosPreparacion;
const { Op } = require('sequelize');

// Crear y guardar un nuevo Paso de Preparación
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.descripcion || !req.body.orden || !req.body.receta_id) {
        res.status(400).send({
            message: "Todos los campos son requeridos: descripcion, orden y receta_id."
        });
        return;
    }

    // Crear un Paso de Preparación
    const pasoPreparacion = {
        descripcion: req.body.descripcion,
        orden: req.body.orden,
        receta_id: req.body.receta_id
    };

    // Guardar el Paso de Preparación en la base de datos
    PasosPreparacion.create(pasoPreparacion)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el Paso de Preparación."
            });
        });
};

// Recuperar todos los Pasos de Preparación de una Receta específica
exports.findAllByRecetaId = (req, res) => {
    const receta_id = req.params.receta_id;

    PasosPreparacion.findAll({ where: { receta_id: receta_id } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los Pasos de Preparación."
            });
        });
};

// Recuperar un Paso de Preparación por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    PasosPreparacion.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el Paso de Preparación con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar el Paso de Preparación con id=" + id
            });
        });
};

// Actualizar un Paso de Preparación por id
exports.update = (req, res) => {
    const id = req.params.id;

    PasosPreparacion.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Paso de Preparación se actualizó exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el Paso de Preparación con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el Paso de Preparación con id=" + id
            });
        });
};

// Eliminar un Paso de Preparación por id
exports.delete = (req, res) => {
    const id = req.params.id;

    PasosPreparacion.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El Paso de Preparación se eliminó exitosamente."
                });
            } else {
                res.send({
                    message: `No se pudo borrar el Paso de Preparación con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al borrar el Paso de Preparación con id=" + id
            });
        });
};