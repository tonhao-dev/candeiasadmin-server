import { faker } from '@faker-js/faker';
import request from 'supertest';
import { app } from '../../app';
import db from '../../database/connection';

describe('CenterController', () => {
  afterAll(async () => {
    await db.destroy();
  });

  describe('POST /centers', () => {
    it('Deve criar um centro com sucesso', async () => {
      const centerData = {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
      };

      const response = await request(app).post('/centers').send(centerData).expect(201);

      expect(response.body.result).toBeDefined();
      expect(typeof response.body.result).toBe('string');

      await db('center').where({ id: response.body.result }).del();
    });

    it('Deve retornar erro ao criar centro inválido', async () => {
      const response = await request(app).post('/centers').send({}).expect(400);

      expect(response.body.result).toBeNull();
      expect(response.body.validations).toContain('Nome é obrigatório');
      expect(response.body.validations).toContain('Endereço é obrigatório');
    });
  });

  describe('GET /centers', () => {
    it('Deve buscar todos os centros', async () => {
      const response = await request(app).get('/centers').expect(200);

      expect(Array.isArray(response.body.result)).toBe(true);
    });
  });

  describe('GET /centers/:id', () => {
    it('Deve retornar um centro pelo ID', async () => {
      const centerData = {
        name: faker.company.name(),
        address: faker.location.streetAddress(),
      };

      const createResponse = await request(app).post('/centers').send(centerData).expect(201);
      const createdId = createResponse.body.result;

      const response = await request(app).get(`/centers/${createdId}`).expect(200);

      expect(response.body.result).toBeDefined();
      expect(response.body.result.id).toBe(createdId);

      await db('center').where({ id: createdId }).del();
    });

    it('Deve retornar erro ao buscar centro inexistente', async () => {
      const response = await request(app)
        .get('/centers/00000000-0000-0000-0000-000000000000')
        .expect(400);

      expect(response.body.result).toBeNull();
      expect(response.body.validations.length).toBeGreaterThan(0);
    });
  });

  describe('PATCH /centers/:id', () => {
    it('Deve atualizar um centro existente', async () => {
      const createResponse = await request(app)
        .post('/centers')
        .send({
          name: faker.company.name(),
          address: faker.location.streetAddress(),
        })
        .expect(201);

      const createdId = createResponse.body.result;

      const patchResponse = await request(app)
        .patch(`/centers/${createdId}`)
        .send({
          name: faker.company.name(),
          address: faker.location.streetAddress(),
          latitude: -9.0,
          longitude: -70.0,
        })
        .expect(200);

      expect(patchResponse.body.result).toBe(createdId);

      await db('center').where({ id: createdId }).del();
    });
  });

  describe('DELETE /centers/:id', () => {
    it('Deve deletar um centro existente', async () => {
      const createResponse = await request(app)
        .post('/centers')
        .send({
          name: faker.company.name(),
          address: faker.location.streetAddress(),
        })
        .expect(201);

      const createdId = createResponse.body.result;

      const deleteResponse = await request(app).delete(`/centers/${createdId}`).expect(200);

      expect(deleteResponse.body.result).toBe(createdId);

      await db('center').where({ id: createdId }).del();
    });
  });
});
