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
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
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
        birthday: subYears(new Date(), 10).toISOString(),
        gender: Genders.Female,
        is_pwd: false,
        race: Race.Black,
        status: Status.Active,
        email: faker.internet.email(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number(),
        facebook: 'maria.clara',
        instagram: 'maria.clara',
        tiktok: 'maria.clara',
        job: faker.person.bio(),
        education_level: 'High School',
        course: 'Science',
        guardian: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
        },
      })
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
      });
  });

  it('Deve retornar 400 se o nome de um aluno de maior não for informado', function () {
    return request(app)
      .post('/student')
      .send({
        birthday: subYears(new Date(), 20),
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('Deve criar um aluno de menor com sucesso', function () {
    return request(app)
      .post('/student')
      .set('Accept', 'application/json')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 10),
        guardian: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
        },
      })
      .expect(200)
      .then(response => {
        expect(response.body.result).toBeDefined();
      });
  });

  it('Deve retornar 400 quando o nome do responsável do aluno criança não for informado', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 20),
        guardian: {
          phone: faker.phone.number(),
        },
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('Deve retornar 400 se o telefone do responsável do aluno criança não for informado', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 10),
        guardian: {
          name: faker.person.fullName(),
        },
      })
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('GET /student/:id', () => {
  it('Deve retornar as informações de um aluno que acabara de ser criado', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body.result).toBeDefined();
        request(app).get(`/student/${response.body.result}`).expect(200);
      });
  });

  it('Deve retornar 400 se o ID do aluno não for encontrado', function () {
    return request(app)
      .get('/student/00000000-0000-0000-0000-000000000000')
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('PATCH /student/:id', () => {
  it('Deve atualizar as informações de um aluno', function () {
    return request(app)
      .post('/student')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .then(async response => {
        const studentID = response.body.result;
        await request(app).patch(`/student/${studentID}`).send({ name: 'Luis Antonio' });
        request(app)
          .get(`/student/${studentID}`)
          .expect(200)
          .then(response => {
            expect(response.body.result.name).toBe('Luis Antonio');
          });
      });
  });
});
