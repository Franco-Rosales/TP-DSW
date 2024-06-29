const db = require('../db/setup');
const Chefs = db.chefs;
const { Op } = require('sequelize');

exports.create = (req, res) => {
    if (!req.body.nombre || !req.body.biografia || !req.body.cantidad_recetas || !req.body.fecha_nacimiento) {
        res.status(400).send({
            message: "Los campos nombre, biografia, cantidad_recetas y fecha_nacimiento son requeridos."
        });
        return;
    }

    const chef = {
        nombre: req.body.nombre,
        biografia: req.body.biografia,
        cantidad_recetas: req.body.cantidad_recetas,
        fecha_nacimiento: req.body.fecha_nacimiento
    };

    Chefs.create(chef)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el chef."
            });
        });
};

exports.findAll = (req, res) => {
    Chefs.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los chefs."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Chefs.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró al chef con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar al chef con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Chefs.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El chef se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar al chef con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar al chef con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Chefs.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El chef se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar al chef con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar al chef con id=" + id
            });
        });
};