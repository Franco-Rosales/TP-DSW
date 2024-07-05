const db = require('../db/setup');
const Contacto = db.contacto;
const { Op } = require('sequelize');


exports.create = (req, res) => {

    if (!req.body.nombre) {
        res.status(400).send({
            message: "El nombre no puede estar vacío!"
        });
        return;
    }


    const contacto = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        mensaje: req.body.mensaje,
        domicilio_id: req.body.domicilio_id,
        fecha_agregado: req.body.fecha_agregado
    };

    Contacto.create(contacto)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la Medida."
            });
        });
};

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condicion = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

    Contacto.findAll({ where: condicion })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las Medidas."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Contacto.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el registro con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar el registro con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Contacto.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El registro se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el registro con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el registro con id=" + id
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;

    Contacto.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "El contacto se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo borrar el contacto con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo borrar el contacto con id=" + id
            });
        });
};