const db = require('../db/setup');
const Noticias = db.noticias;
const { Op, where } = require('sequelize');

exports.create = (req, res) => {
    // Validación básica de campos requeridos
    if (!req.body.titulo || !req.body.descripcion || !req.body.fecha || !req.body.chef_id) {
        res.status(400).send({
            message: "Los campos titulo, descripcion, fecha y chef_id son requeridos."
        });
        return;
    }

    const noticias = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        chef_id: req.body.chef_id
    };

    Noticias.create(noticias)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la noticia."
            });
        });
};

exports.findAll = (req, res) => {
    const { titulo_like } = req.query;
    let condition = titulo_like ? { titulo: { [Op.like]: `%${titulo_like}%` } } : null;

    Noticias.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al recuperar las noticias."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Noticias.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la noticia con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la noticia con id=" + id
            });
        });
};

exports.update = (req, res) => {
    const id = req.params.id;

    Noticias.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La noticia se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la noticia con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la noticia con id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Noticias.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La noticia se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la noticia con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar la noticia con id=" + id
            });
        });
};
