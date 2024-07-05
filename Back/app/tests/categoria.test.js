const request = require('supertest');
const express = require('express');
const categoriasController = require('../controllers/categoriasController');

const app = express();
app.use(express.json());
const categoriasRoutes = require('../routes/categoriasRoutes');
app.use('/api/categorias', categoriasRoutes);

describe('POST /api/categorias', () => {
    it('Crea una nueva categoría correctamente', async () => {
        const newCategoria = {
            nombre: 'Nueva Categoría',
            descripcion: 'Descripción de la nueva categoría'
        };

        const res = await request(app)
            .post('/api/categorias')
            .send(newCategoria);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nombre).toBe(newCategoria.nombre);
    });

    it('Devuelve un error 400 si falta algún campo requerido', async () => {
        const incompleteCategoria = {
            descripcion: 'Descripción de la nueva categoría'
        };

        const res = await request(app)
            .post('/api/categorias')
            .send(incompleteCategoria);

        expect(res.status).toBe(400);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Los campos nombre y descripcion son requeridos."
        });
    });
});


describe('GET /api/categorias', () => {
    it('Obtiene todas las categorías', async () => {
        const res = await request(app)
            .get('/api/categorias');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Filtrar categorías por nombre_like', async () => {
        const nombre_like = 'Categoría';

        const res = await request(app)
            .get(`/api/categorias?nombre_like=${nombre_like}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(res.body)).toBeTruthy();
        if (res.body.length > 0) {
            expect(res.body[0].nombre.toLowerCase()).toContain(nombre_like.toLowerCase());
        }
    });
});


describe('GET /api/categorias/:id', () => {
    it('Obtiene una categoría por su ID', async () => {
        // Supongamos que aquí necesitas insertar una categoría de prueba en la base de datos antes
        // de realizar esta prueba para obtener su ID.
        const id = 1; // Reemplaza con el ID de la categoría insertada

        const res = await request(app)
            .get(`/api/categorias/${id}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.id).toBe(id);
    });

    it('Devuelve un error 404 si la categoría no existe', async () => {
        const id = 999; // ID que sabes que no existe en la base de datos

        const res = await request(app)
            .get(`/api/categorias/${id}`);

        expect(res.status).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: `No se encontró la categoría con id=${id}.`
        });
    });
});


describe('PUT /api/categorias/:id', () => {
    it('Actualiza una categoría existente', async () => {
        // Supongamos que aquí necesitas insertar una categoría de prueba en la base de datos antes
        // de realizar esta prueba para obtener su ID.
        const id = 1; // Reemplaza con el ID de la categoría insertada
        const updatedCategoria = {
            nombre: 'Categoría Actualizada',
            descripcion: 'Nueva descripción de la categoría actualizada.'
        };

        const res = await request(app)
            .put(`/api/categorias/${id}`)
            .send(updatedCategoria);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡La categoría se actualizó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID de la categoría a actualizar no es válido', async () => {
        const invalidId = 'invalid-id';

        const res = await request(app)
            .put(`/api/categorias/${invalidId}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Ocurrió un error al actualizar la categoría con id=" + invalidId
        });
    });
});


describe('DELETE /api/categorias/:id', () => {
    it('Elimina una categoría existente', async () => {
        // Supongamos que aquí necesitas insertar una categoría de prueba en la base de datos antes
        // de realizar esta prueba para obtener su ID.
        const id = 1; // Reemplaza con el ID de la categoría insertada

        const res = await request(app)
            .delete(`/api/categorias/${id}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡La categoría se eliminó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID de la categoría a eliminar no es válido', async () => {
        const invalidId = 'invalid-id';

        const res = await request(app)
            .delete(`/api/categorias/${invalidId}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Ocurrió un error al eliminar la categoría con id=" + invalidId
        });
    });
});
