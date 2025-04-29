// belt.test.ts
import request from 'supertest';
import { app } from '../../app';
import db from '../../database/connection';
import path from 'path';

describe('GET /belts', () => {
  it('Valida a estrutura da listagem de tipos de graduação e as graduações correspondentes', async function () {
    const response = await request(app)
      .get('/belts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.result).toBeDefined();
    expect(Array.isArray(response.body.result)).toBe(true);

    if (response.body.result.length > 0) {
      const beltType = response.body.result[0];
      expect(beltType).toHaveProperty('id');
      expect(beltType).toHaveProperty('code');
      expect(beltType).toHaveProperty('name');
      expect(beltType).toHaveProperty('range_start_in_years');
      expect(beltType).toHaveProperty('range_end_in_years');
      expect(beltType).toHaveProperty('created_at');
      expect(beltType).toHaveProperty('updated_at');
      expect(beltType).toHaveProperty('deleted_at');
      expect(beltType).toHaveProperty('belts');
      expect(Array.isArray(beltType.belts)).toBe(true);

      if (beltType.belts.length > 0) {
        const belt = beltType.belts[0];
        expect(belt).toHaveProperty('id');
        expect(belt).toHaveProperty('name');
        expect(belt).toHaveProperty('title');
        expect(belt).toHaveProperty('color_hex_code');
        expect(belt).toHaveProperty('belt_type_code');
        expect(belt).toHaveProperty('created_at');
        expect(belt).toHaveProperty('updated_at');
        expect(belt).toHaveProperty('deleted_at');
      }
    }
  });

  it('Deve retornar uma lista vazia se não houver tipos de faixa cadastrados', async function () {
    await db('belt').del();
    await db('belt_type').del();

    const response = await request(app)
      .get('/belts')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.result).toBeDefined();
    expect(Array.isArray(response.body.result)).toBe(true);
    expect(response.body.result.length).toBe(0);

    await db.seed.run({
      directory: path.resolve(__dirname, '..', '..', 'database', 'seeds'),
    });
  });
});
