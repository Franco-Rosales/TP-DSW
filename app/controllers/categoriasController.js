const db = require('../db/setup');
const Categoria = db.categorias;
const { Op } = require('sequelize');

// Crea y guarda una nueva categoría
exports.create = (req, res) => {
  // Validar la solicitud
  if (!req.body.nombre) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Crear una categoría
  const categoria = {
    nombre: req.body.nombre
  };

  // Guardar la categoría en la base de datos
  Categoria.create(categoria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al crear la categoría."
      });
    });
};

// Recupera todas las categorías de la base de datos
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

  Categoria.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocurrió un error al recuperar las categorías."
      });
    });
};

// Recupera una categoría por id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró la categoría con id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrió un error al recuperar la categoría con id=" + id
      });
    });
};

// Actualiza una categoría por id
exports.update = (req, res) => {
  const id = req.params.id;

  Categoria.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La categoría se actualizó exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo actualizar la categoría con id=${id}. Tal vez no se encontró la categoría o req.body está vacío.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ocurrió un error al actualizar la categoría con id=" + id
      });
    });
};

// Elimina una categoría por id
exports.delete = (req, res) => {
  const id = req.params.id;

  Categoria.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "¡La categoría se eliminó exitosamente!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar la categoría con id=${id}. Tal vez no se encontró la categoría.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar la categoría con id=" + id
      });
    });
};