import request from 'supertest';
import { app } from '../../server';

describe('GET /student', () => {
  it('Deve retornar uma lista de alunos', function () {
    return request(app)
      .get('/student')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
        expect(response.body.result.length).toBeGreaterThan(0);
      });
  });
});

describe('POST /student', () => {
  it('Deve criar um aluno de maior', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: '2001-02-05T05:00:00.000Z',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
      });
  });

  it('Deve retornar 400 se o nome não for informado', function () {
    return request(app)
      .post('/student')
      .send({
        birthday: '2001-02-05T05:00:00.000Z',
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('Deve criar um aluno de menor', function () {
    return request(app)
      .post('/student')
      .set('Accept', 'application/json')
      .send({
        name: 'Luis Santiago',
        birthday: '2024-02-05T05:00:00.000Z',
        guardian: {
          name: 'João da Silva',
          phone: '11999999999',
        },
      })
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
      });
  });
});
