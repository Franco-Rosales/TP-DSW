const db = require('../db/setup');
const Dificultades = db.dificultades;
const { Op } = require('sequelize');

// Crear una nueva dificultad
exports.create = (req, res) => {
    // Validar la petición
    if ( !req.body.nombre || !req.body.descripcion || !req.body.edad_recomendada) {
        res.status(400).send({
            message: "Los campos nombre, descripcion y edad recomendada son requeridos."
        });
        return;
    }

    // Crear la dificultad
    const dificultad = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        edad_recomendada: req.body.edad_recomendada,
        fechaCarga: new Date()
    };

    // Guardar la dificultad en la base de datos
    Dificultades.create(dificultad)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrió un error al crear la dificultad."
            });
        });
};

// Recuperar todas las dificultades
// exports.findAll = (req, res) => {
//     Dificultades.findAll()
//         .then(data => {
//             res.send(data);
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Ocurrió un error al recuperar las dificultades."
//             });
//         });
// };

exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
  
    Dificultades.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ocurrió un error al recuperar las dificultades."
        });
      });
  };

  
// Recuperar una dificultad por id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Dificultades.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `No se encontró la dificultad con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al recuperar la dificultad con id=" + id
            });
        });
};

// Actualizar una dificultad por id
exports.update = (req, res) => {
    const id = req.params.id;

    Dificultades.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La dificultad se actualizó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo actualizar la dificultad con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al actualizar la dificultad con id=" + id
            });
        });
};

// Eliminar una dificultad por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Dificultades.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "¡La dificultad se eliminó exitosamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar la dificultad con id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Ocurrió un error al eliminar la dificultad con id=" + id
            });
        });
};