const db = require('../db/setup');
const Usuarios = db.usuarios;
const { Op } = require('sequelize');

// Crear un nuevo usuario
exports.create = (req, res) => {
    // Validar la petición
    if (!req.body.nombre || !req.body.email) {
        res.status(400).send({
            message: "Los campos nombre y email son requeridos."
        });
        return;
    }

    // Crear el usuario
    const usuario = {
        nombre: req.body.nombre,
        email: req.body.email
    };

    // Guardar el usuario en la base de datos
    Usuarios.create(usuario)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el usuario."
            });
        });
};

// Recuperar todos los usuarios
exports.findAll = (req, res) => {
    Usuarios.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar los usuarios."
            });
        });
};

// Recuperar un usuario por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Usuarios.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el usuario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar el usuario con id=" + id
            });
        });
};

// Actualizar un usuario por id
exports.update = (req, res) => {
    const id = req.params.id;

    Usuarios.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El usuario se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el usuario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el usuario con id=" + id
            });
        });
};

// Eliminar un usuario por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Usuarios.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El usuario se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el usuario con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar el usuario con id=" + id
            });
        });
};