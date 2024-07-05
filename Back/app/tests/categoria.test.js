const request = require('supertest');
const app = require('../app'); // Asegúrate de ajustar la ruta según tu configuración
const db = require('../db/setup');
const Categoria = db.categorias;

describe('POST /api/categorias', () => {
    afterEach(async () => {
        // Limpiar la base de datos después de cada prueba
        await Categoria.destroy({ where: {} });
    });

    it('Crea una nueva categoría correctamente', async () => {
        const nuevaCategoria = {
            nombre: 'Postres',
            descripcion: 'Postres dulces y deliciosos.'
        };

        const res = await request(app)
            .post('/api/categorias')
            .send(nuevaCategoria);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('id');
        expect(res.body.nombre).toBe(nuevaCategoria.nombre);
    });

    it('Devuelve un error 400 si falta el nombre de la categoría', async () => {
        const categoriaSinNombre = {
            descripcion: 'Categoría sin nombre.'
        };

        const res = await request(app)
            .post('/api/categorias')
            .send(categoriaSinNombre);

        expect(res.status).toBe(400);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡El contenido no puede estar vacío!"
        });
    });
});



describe('GET /api/categorias', () => {
    beforeAll(async () => {
        // Insertar categorías de prueba en la base de datos antes de las pruebas
        await Categoria.bulkCreate([
            { nombre: 'Postres', descripcion: 'Postres dulces y deliciosos.' },
            { nombre: 'Ensaladas', descripcion: 'Ensaladas frescas y saludables.' },
            { nombre: 'Pastas', descripcion: 'Pastas italianas caseras.' }
        ]);
    });

    afterAll(async () => {
        // Limpiar la base de datos después de las pruebas
        await Categoria.destroy({ where: {} });
    });

    it('Obtiene todas las categorías', async () => {
        const res = await request(app)
            .get('/api/categorias');

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('Filtrar categorías por nombre_like', async () => {
        const nombre_like = 'Post';

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
    let categoriaId;

    beforeAll(async () => {
        // Insertar una categoría de prueba en la base de datos antes de las pruebas
        const categoria = await Categoria.create({
            nombre: 'Desayunos',
            descripcion: 'Variedad de desayunos nutritivos.'
        });
        categoriaId = categoria.id;
    });

    afterAll(async () => {
        // Limpiar la base de datos después de las pruebas
        await Categoria.destroy({ where: {} });
    });

    it('Obtiene una categoría por su ID', async () => {
        const res = await request(app)
            .get(`/api/categorias/${categoriaId}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body.id).toBe(categoriaId);
    });

    it('Devuelve un error 404 si la categoría no existe', async () => {
        const idNoExistente = 999;

        const res = await request(app)
            .get(`/api/categorias/${idNoExistente}`);

        expect(res.status).toBe(404);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: `No se encontró la categoría con id=${idNoExistente}.`
        });
    });
});


describe('PUT /api/categorias/:id', () => {
    let categoriaId;

    beforeAll(async () => {
        // Insertar una categoría de prueba en la base de datos antes de las pruebas
        const categoria = await Categoria.create({
            nombre: 'Bebidas',
            descripcion: 'Variedad de bebidas refrescantes.'
        });
        categoriaId = categoria.id;
    });

    afterAll(async () => {
        // Limpiar la base de datos después de las pruebas
        await Categoria.destroy({ where: {} });
    });

    it('Actualiza una categoría existente', async () => {
        const categoriaActualizada = {
            nombre: 'Bebidas Frías',
            descripcion: 'Variedad de bebidas refrescantes y frías.'
        };

        const res = await request(app)
            .put(`/api/categorias/${categoriaId}`)
            .send(categoriaActualizada);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡La categoría se actualizó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID de la categoría a actualizar no es válido', async () => {
        const idInvalido = 'invalid-id';

        const res = await request(app)
            .put(`/api/categorias/${idInvalido}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: `Ocurrió un error al actualizar la categoría con id=${idInvalido}`
        });
    });
});



describe('DELETE /api/categorias/:id', () => {
    let categoriaId;

    beforeAll(async () => {
        // Insertar una categoría de prueba en la base de datos antes de las pruebas
        const categoria = await Categoria.create({
            nombre: 'Pizzas',
            descripcion: 'Variedad de pizzas artesanales.'
        });
        categoriaId = categoria.id;
    });

    afterAll(async () => {
        // Limpiar la base de datos después de las pruebas
        await Categoria.destroy({ where: {} });
    });

    it('Elimina una categoría existente', async () => {
        const res = await request(app)
            .delete(`/api/categorias/${categoriaId}`);

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "¡La categoría se eliminó exitosamente!"
        });
    });

    it('Devuelve un error 500 si el ID de la categoría a eliminar no es válido', async () => {
        const idInvalido = 'invalid-id';

        const res = await request(app)
            .delete(`/api/categorias/${idInvalido}`);

        expect(res.status).toBe(500);
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toEqual({
            message: "No se pudo eliminar la categoría con id=" + idInvalido
        });
    });
});



