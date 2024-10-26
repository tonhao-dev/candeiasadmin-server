import request from 'supertest';
import { app } from '../../server';
import { subYears } from 'date-fns';
import { Genders } from '../../enum/gender';
import { Race } from '../../enum/race';
import { Status } from '../../enum/status';
import { faker } from '@faker-js/faker/.';

describe('GET /student', () => {
  it('Deve retornar uma lista de alunos', function () {
    return request(app)
      .get('/student')
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
      });
  });
});

describe('POST /student', () => {
  it('Deve criar um aluno de maior com apenas as informações obrigatórias', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: '2001-02-05T05:00:00.000Z',
        gender: 1,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
      });
  });

  it('Deve criar um aluno criança com todas as informações completas', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Maria Clara',
        birthday: subYears(new Date(), 10),
        gender: Genders.Female,
        is_pwd: false,
        race: Race.Black,
        status: Status.Active,
        email: 'maria.clara@example.com',
        address: '123 Main St, Anytown, USA',
        phone: '1234567890',
        facebook: 'maria.clara',
        instagram: 'maria.clara',
        tiktok: 'maria.clara',
        job: 'Student',
        education_level: 'High School',
        course: 'Science',
        guardian: {
          name: 'Guardião da Maria Clara',
          phone: '11999999999',
        },
      })
      .set('Accept', 'application/json')
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
