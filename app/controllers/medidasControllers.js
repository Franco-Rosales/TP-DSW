const db = require('../db/setup');
const Medidas = db.medidas;
const { Op } = require('sequelize');

// Crear y guardar una nueva Medida
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }

    // Crear una Medida
    const medida = {
        nombre: req.body.nombre
    };

    // Guardar la Medida en la base de datos
    Medidas.create(medida)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la Medida."
            });
        });
};

// Recuperar todas las Medidas de la base de datos
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condicion = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Medidas.findAll({ where: condicion })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las Medidas."
            });
        });
};

// Recuperar una Medida por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Medidas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la Medida con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la Medida con id=" + id
            });
        });
};

// Actualizar una Medida por id
exports.update = (req, res) => {
    const id = req.params.id;

    Medidas.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Medida se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la Medida con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la Medida con id=" + id
            });
        });
};

// Eliminar una Medida por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Medidas.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "La Medida se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar la Medida con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo borrar la Medida con id=" + id
            });
        });
};