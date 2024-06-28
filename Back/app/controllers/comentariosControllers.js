const db = require('../db/setup');
const Comentarios = db.comentarios;
const { Op } = require('sequelize');

// Crear y guardar un nuevo comentario
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.contenido || !req.body.usuario_id || !req.body.receta_id) {
        res.status(400).send({
            message: "El contenido, usuario_id y receta_id no pueden estar vacíos!"
        });
        return;
    }

    // Crear un comentario
    const comentario = {
        contenido: req.body.contenido,
        fecha_creacion: req.body.fecha_creacion || new Date(),
        usuario_id: req.body.usuario_id,
        receta_id: req.body.receta_id
    };

    // Guardar comentario en la base de datos
    Comentarios.create(comentario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el comentario."
            });
        });
};

// Recuperar todos los comentarios de la base de datos
exports.findAll = (req, res) => {
    const contenido = req.query.contenido;
    var condition = contenido ? { contenido: { [Op.like]: `%${contenido}%` } } : null;

    Comentarios.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los comentarios."
            });
        });
};

// Recuperar un comentario por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Comentarios.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el comentario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar el comentario con id=" + id
            });
        });
};

// Actualizar un comentario por id
exports.update = (req, res) => {
    const id = req.params.id;

    Comentarios.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El comentario se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el comentario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el comentario con id=" + id
            });
        });
};

// Eliminar un comentario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Comentarios.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El comentario se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar el comentario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo borrar el comentario con id=" + id
            });
        });
};