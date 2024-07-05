const request = require('supertest');
const express = require('express');
const chefsController = require('../controllers/chefsController');

const app = express();
app.use(express.json());
app.use('/api/chefs', require('../routes/chefsRoutes')); // Asumiendo que el archivo de rutas se llama chefs.js y está en la carpeta routes

describe('POST /api/chefs', () => {
    it('Crea un nuevo chef correctamente', async () => {
        const newChef = {
            nombre: 'Nuevo Chef',
            biografia: 'Chef con experiencia en cocina internacional.',
            cantidad_recetas: 50,
            fecha_nacimiento: '1980-05-15'
        };

        const res = await request(app)
            .post('/api/chefs')
            .send(newChef);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nombre).toBe(newChef.nombre);
    });

    it('Devuelve un error 400 si falta algún campo requerido', async () => {
        const incompleteChef = {
            biografia: 'Chef con experiencia en cocina internacional.',
            cantidad_recetas: 50,
            fecha_nacimiento: '1980-05-15'
        };

        const res = await request(app)
            .post('/api/chefs')
            .send(incompleteChef);

        expect(res.status).toBe(400);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Los campos nombre, biografia, cantidad_recetas y fecha_nacimiento son requeridos."
        });
    });
});


describe('GET /api/chefs', () => {
    it('Obtiene todos los chefs', async () => {
        const res = await request(app)
            .get('/api/chefs');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Filtrar chefs por nombre_like', async () => {
        const nombre_like = 'Chef';

        const res = await request(app)
            .get(`/api/chefs?nombre_like=${nombre_like}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(res.body)).toBeTruthy();
        if (res.body.length > 0) {
            expect(res.body[0].nombre.toLowerCase()).toContain(nombre_like.toLowerCase());
        }
    });
});


describe('GET /api/chefs/:id', () => {
    it('Obtiene un chef por su ID', async () => {
        const id = 1; // Asegúrate de que exista un chef con ID 1 en tu base de datos de prueba

        const res = await request(app)
            .get(`/api/chefs/${id}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.id).toBe(id);
    });

    it('Devuelve un error 404 si el chef no existe', async () => {
        const id = 999; // ID que no debería existir en tu base de datos de prueba

        const res = await request(app)
            .get(`/api/chefs/${id}`);

        expect(res.status).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: `No se encontró al chef con id=${id}.`
        });
    });
});



describe('PUT /api/chefs/:id', () => {
    it('Actualiza un chef existente', async () => {
        const id = 1; // Asegúrate de que exista un chef con ID 1 en tu base de datos de prueba
        const updatedChef = {
            nombre: 'Chef Actualizado',
            biografia: 'Nueva biografía del chef actualizada.',
            cantidad_recetas: 60,
            fecha_nacimiento: '1975-03-20'
        };

        const res = await request(app)
            .put(`/api/chefs/${id}`)
            .send(updatedChef);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡El chef se actualizó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID del chef a actualizar no es válido', async () => {
        const invalidId = 'invalid-id';

        const res = await request(app)
            .put(`/api/chefs/${invalidId}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Ocurrió un error al actualizar al chef con id=" + invalidId
        });
    });
});



describe('DELETE /api/chefs/:id', () => {
    it('Elimina un chef existente', async () => {
        const id = 1; // Asegúrate de que exista un chef con ID 1 en tu base de datos de prueba

        const res = await request(app)
            .delete(`/api/chefs/${id}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡El chef se eliminó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID del chef a eliminar no es válido', async () => {
        const invalidId = 'invalid-id';

        const res = await request(app)
            .delete(`/api/chefs/${invalidId}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "Ocurrió un error al eliminar al chef con id=" + invalidId
        });
    });
});





