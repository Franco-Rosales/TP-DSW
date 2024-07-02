const db = require('../db/setup');
const Recetas = db.recetas;
const { Op } = require('sequelize');

// Crear una nueva receta
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.nombre || !req.body.descripcion || !req.body.instrucciones || !req.body.tiempo_preparacion 
        || !req.body.chef_id) {
        res.status(400).send({
            message: "Los campos nombre, descripcion, instrucciones y tiempo_preparacion, chef son requeridos."
        });
        return;
    }

    // Crear la receta
    const receta = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        instrucciones: req.body.instrucciones,
        tiempo_preparacion: req.body.tiempo_preparacion,
        fecha_creacion: new Date(),
        chef_id: req.body.chef_id
    };

    // Guardar la receta en la base de datos
    Recetas.create(receta)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la receta."
            });
        });
};

// Recuperar todas las recetas
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    const condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Recetas.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las recetas."
            });
        });
};

// Recuperar una receta por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Recetas.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la receta con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la receta con id=" + id
            });
        });
};

// Actualizar una receta por id
exports.update = (req, res) => {
    const id = req.params.id;

    Recetas.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La receta se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la receta con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la receta con id=" + id
            });
        });
};

// Eliminar una receta por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Recetas.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La receta se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la receta con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar la receta con id=" + id
            });
        });
};