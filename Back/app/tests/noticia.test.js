const request = require('supertest');
const express = require('express');
const noticiasController = require('../controllers/noticiasController');

const app = express();
app.use(express.json());
const noticiasRoutes = require('../routes/noticiasRoutes');
app.use('/api/noticias', noticiasRoutes);

describe('POST /api/noticias', () => {
    it('Crea una nueva noticia correctamente', async () => {
        const newNoticia = {
            titulo: 'Nueva Noticia',
            descripcion: 'Descripción de la nueva noticia',
            fecha: new Date().toISOString(),
            chef_id: 1 // Ajusta según tus necesidades de prueba
        };

        const res = await request(app)
            .post('/api/noticias')
            .send(newNoticia);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body.titulo).toBe(newNoticia.titulo);
    });

    it('Devuelve un error 400 si falta algún campo requerido', async () => {
        const incompleteNoticia = {
            descripcion: 'Descripción de la nueva noticia',
            fecha: new Date().toISOString(),
            chef_id: 1 // Ajusta según tus necesidades de prueba
        };

        const res = await request(app)
            .post('/api/noticias')
            .send(incompleteNoticia);

        expect(res.status).toBe(400);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Los campos titulo, descripcion, fecha y chef_id son requeridos."
        });
    });
});


describe('GET /api/noticias', () => {
    it('Obtiene todas las noticias', async () => {
        const res = await request(app)
            .get('/api/noticias');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Puedes añadir más tests para filtrar noticias por diferentes criterios si es necesario
});


describe('GET /api/noticias/:id', () => {
    it('Obtiene una noticia por su ID', async () => {
        // Supongamos que aquí necesitas insertar una noticia de prueba en la base de datos antes
        // de realizar esta prueba para obtener su ID.
        const id = 1; // Reemplaza con el ID de la noticia insertada

        const res = await request(app)
            .get(`/api/noticias/${id}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.id).toBe(id);
    });

    it('Devuelve un error 404 si la noticia no existe', async () => {
        const id = 999; // ID que sabes que no existe en la base de datos

        const res = await request(app)
            .get(`/api/noticias/${id}`);

        expect(res.status).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: `No se encontró la noticia con id=${id}.`
        });
    });
});


describe('PUT /api/noticias/:id', () => {
    it('Actualiza una noticia existente', async () => {
        // Supongamos que aquí necesitas insertar una noticia de prueba en la base de datos antes
        // de realizar esta prueba para obtener su ID.
        const id = 1; // Reemplaza con el ID de la noticia insertada
        const updatedNoticia = {
            titulo: 'Noticia Actualizada',
            descripcion: 'Nueva descripción de la noticia actualizada.',
            fecha: new Date().toISOString(),
            chef_id: 2 // Ajusta según tus necesidades de prueba
        };

        const res = await request(app)
            .put(`/api/noticias/${id}`)
            .send(updatedNoticia);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡La noticia se actualizó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID de la noticia a actualizar no es válido', async () => {
        const invalidId = 'invalid-id';

        const res = await request(app)
            .put(`/api/noticias/${invalidId}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Ocurrió un error al actualizar la noticia con id=" + invalidId
        });
    });
});


describe('DELETE /api/noticias/:id', () => {
    it('Elimina una noticia existente', async () => {
        // Supongamos que aquí necesitas insertar una noticia de prueba en la base de datos antes
        // de realizar esta prueba para obtener su ID.
        const id = 1; // Reemplaza con el ID de la noticia insertada

        const res = await request(app)
            .delete(`/api/noticias/${id}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡La noticia se eliminó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID de la noticia a eliminar no es válido', async () => {
        const invalidId = 'invalid-id';

        const res = await request(app)
            .delete(`/api/noticias/${invalidId}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Ocurrió un error al eliminar la noticia con id=" + invalidId
        });
    });
});
