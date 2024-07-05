const db = require('../db/setup');
const RecetaIngredientes = db.recetasIngredientes;  

exports.create = async (req, res) => {
    if (!req.body.receta_id || !req.body.ingrediente_id || !req.body.cantidad || !req.body.unidad) {
        res.status(400).send({
            message: "Los campos receta_id, ingrediente_id, cantidad y unidad son requeridos."
        });
        return;
    }

    const recetaIngrediente = {
        receta_id: req.body.receta_id,
        ingrediente_id: req.body.ingrediente_id,
        cantidad: req.body.cantidad,
        unidad: req.body.unidad
    };

    try {
        const data = await RecetaIngredientes.create(recetaIngrediente);
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear la asociación receta-ingrediente."
        });
    }
};

exports.findAll = async (req, res) => {
    const nombre = req.query.nombre;
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;
    try {
        const data = await RecetaIngredientes.findAll({ where: condition });
        res.send(data);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Ocurrió un error al recuperar las asociaciones receta-ingrediente."
        });
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await RecetaIngredientes.findOne({ where: { id } });
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `No se encontró la asociación receta-ingrediente.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: `Ocurrió un error al recuperar la asociación receta-ingrediente.`
        });
    }
};

exports.update = async (req, res) => {
    const id = req.params.id;

    try {
        const num = await RecetaIngredientes.update(req.body, { where: { id: id } });
        if (num == 1) {
            res.send({
                message: "¡La asociación receta-ingrediente se actualizó exitosamente!"
            });
        } else {
            res.send({
                message: `No se pudo actualizar la asociación receta-ingrediente con receta_id=${receta_id} e ingrediente_id=${ingrediente_id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: `Ocurrió un error al actualizar la asociación receta-ingrediente con receta_id=${receta_id} e ingrediente_id=${ingrediente_id}.`
        });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    try {
        const num = await RecetaIngredientes.destroy({ where: { id: id } });
        if (num == 1) {
            res.send({
                message: "¡La asociación receta-ingrediente se eliminó exitosamente!"
            });
        } else {
            res.send({
                message: `No se pudo eliminar la asociación receta-ingrediente con id=${id}.`
            });
        }
    } catch (err) {
        res.status(500).send({
            message: `Ocurrió un error al eliminar la asociación receta-ingrediente con id=${id}.`
        });
    }
};