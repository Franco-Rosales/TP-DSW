const db = require('../db/setup');
const Domicilios = db.domicilios;
const { Op } = require('sequelize');

// Crear un nuevo domicilio
exports.create = (req, res) => {
    // Validar la petición
    if ( !req.body.calle || !req.body.nro_calle || !req.body.barrio ) {
        res.status(400).send({
            message: "Los campos calle, numero calle y barrio son requeridos."
        });
        return;
    }

    // Crear el domicilio
    const domicilio = {
        calle: req.body.calle,
        nro_calle: req.body.nro_calle,
        barrio:req.body.barrio,
        fecha_carga: new Date()
    };

    // Guardar la dificultad en la base de datos
    Domicilios.create(domicilio)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear el domicilio."
            });
        });
};


exports.findAll = (req, res) => {
    const calle = req.query.calle;
    var condition = calle ? { calle: { [Op.like]: `%${calle}%` } } : null;
  
    Domicilios.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrió un error al recuperar los domicilios."
        });
      });
  };

  
// Recuperar un domicilio por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Domicilios.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró el domicilio con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar el domicilio con id=" + id
            });
        });
};

// Actualizar un domicilio por id
exports.update = (req, res) => {
    const id = req.params.id;

    Domicilios.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El domicilio se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar el domicilio con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar el domicilio con id=" + id
            });
        });
};

// Eliminar un domicilio por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Domicilios.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡El domicilio se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el domicilio con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar el domicilio con id=" + id
            });
        });
};