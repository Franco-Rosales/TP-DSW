const db = require('../db/setup');
const Ingredientes = db.ingredientes;
const { Op } = require('sequelize');

// Crear y guardar un nuevo ingrediente
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.nombre || !req.body.cantidad || !req.body.unidad) {
        res.status(400).send({
            message: "El nombre, cantidad y unidad no pueden estar vacíos!"
        });
        return;
    }

    // Crear un ingrediente
    const ingrediente = {
        nombre: req.body.nombre,
        cantidad: req.body.cantidad,
        unidad: req.body.unidad,
        receta_id: req.body.receta_id
    };

    // Guardar ingrediente en la base de datos
    Ingredientes.create(ingrediente)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el ingrediente."
            });
        });
};

// Recuperar todos los ingredientes de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Ingredientes.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los ingredientes."
            });
        });
};

// Recuperar un ingrediente por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Ingredientes.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el ingrediente con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar el ingrediente con id=" + id
            });
        });
};

// Actualizar un ingrediente por id
exports.update = (req, res) => {
    const id = req.params.id;

    Ingredientes.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El ingrediente se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el ingrediente con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el ingrediente con id=" + id
            });
        });
};

// Eliminar un ingrediente por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Ingredientes.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El ingrediente se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar el ingrediente con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo borrar el ingrediente con id=" + id
            });
        });
};