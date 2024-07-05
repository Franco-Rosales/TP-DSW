const request = require('supertest');
const express = require('express');
const recetasController = require('../controllers/recetasController');

const app = express();
app.use(express.json());
app.use('/api/recetas', require('../routes/recetasRoutes')); 

describe('Endpoints de Recetas', () => {
  beforeEach(async () => {
    await Recetas.destroy({ where: {} });
  });

  describe('POST /api/recetas', () => {
    it('Crea una nueva receta', async () => {
      const nuevaReceta = {
        nombre: 'Nueva Receta',
        descripcion: 'Descripción de la nueva receta',
        instrucciones: 'Instrucciones de la nueva receta',
        tiempo_preparacion: 30,
        chef_id: 1,
        categoria_id: 1,
        dificultad_id: 1
      };

      const res = await request(app)
        .post('/api/recetas')
        .send(nuevaReceta);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toHaveProperty('id');
      expect(res.body.nombre).toBe(nuevaReceta.nombre);
    });

    it('Debe retornar un error 400 si falta un campo requerido', async () => {
      const recetaSinCamposRequeridos = {
      };

      const res = await request(app)
        .post('/api/recetas')
        .send(recetaSinCamposRequeridos);

      expect(res.status).toBe(400);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toEqual({
        message: 'Los campos nombre, descripcion, instrucciones, tiempo_preparacion, chef_id, categoria_id y dificultad_id son requeridos.'
      });
    });
  });

  describe('GET /api/recetas', () => {
    it('Recupera todas las recetas', async () => {
 
      const res = await request(app)
        .get('/api/recetas');

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(Array.isArray(res.body)).toBeTruthy();
    });
  });

  describe('GET /api/recetas/:id', () => {
    it('Recupera una receta por id existente', async () => {
 
      const recetaId = 1; 
      const res = await request(app)
        .get(`/api/recetas/${recetaId}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body.id).toBe(recetaId);
    });

    it('Retorna 404 si no se encuentra la receta', async () => {
      const recetaIdInexistente = 9999;
      const res = await request(app)
        .get(`/api/recetas/${recetaIdInexistente}`);

      expect(res.status).toBe(404);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toEqual({
        message: `No se encontró la receta con id=${recetaIdInexistente}.`
      });
    });
  });

  describe('PUT /api/recetas/:id', () => {
    it('Actualiza una receta por id existente', async () => {
  
      const recetaId = 1;
      const datosActualizados = {
        nombre: 'Receta Actualizada',
      };

      const res = await request(app)
        .put(`/api/recetas/${recetaId}`)
        .send(datosActualizados);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toEqual({
        message: '¡La receta se actualizó exitosamente!'
      });
    });

    it('Retorna un mensaje de error si no se puede actualizar la receta', async () => {
      const recetaIdInexistente = 9999; 
      const datosActualizados = {
        nombre: 'Receta Actualizada',
       
      };

      const res = await request(app)
        .put(`/api/recetas/${recetaIdInexistente}`)
        .send(datosActualizados);

      expect(res.status).toBe(500);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toEqual({
        message: `Ocurrió un error al actualizar la receta con id=${recetaIdInexistente}`
      });
    });
  });

  describe('DELETE /api/recetas/:id', () => {
    it('Elimina una receta por id existente', async () => {

      const recetaId = 1; 

      const res = await request(app)
        .delete(`/api/recetas/${recetaId}`);

      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toEqual({
        message: '¡La receta se eliminó exitosamente!'
      });
    });

    it('Retorna un mensaje de error si no se puede eliminar la receta', async () => {
      const recetaIdInexistente = 9999; 
      const res = await request(app)
        .delete(`/api/recetas/${recetaIdInexistente}`);

      expect(res.status).toBe(500);
      expect(res.headers['content-type']).toMatch(/json/);
      expect(res.body).toEqual({
        message: `Ocurrió un error al eliminar la receta con id=${recetaIdInexistente}`
      });
    });
  });
});
