import { faker } from '@faker-js/faker';
import { subYears } from 'date-fns';
import request from 'supertest';
import { app } from '../../app';
import db from '../../database/connection';
import { Genders } from '../../enum/gender';
import { Race } from '../../enum/race';
import { Status } from '../../enum/status';

describe('GET /students', () => {
  it('Deve retornar uma lista de alunos', async function () {
    const response = await request(app)
      .get('/students')
      .set('Accept', 'application/json')
      .expect(200);
    expect(response.body.result).toBeDefined();
  });
});

describe('POST /people', () => {
  it('Deve criar um aluno de maior com apenas as informações obrigatórias', async function () {
    const response = await request(app)
      .post('/people')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.result).toBeDefined();

    await db('person').where('id', response.body.result).del();
  });

  it('Deve criar um aluno criança com todas as informações completas', async function () {
    const response = await request(app)
      .post('/people')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 10).toISOString(),
        gender: Genders.Male,
        is_pwd: false,
        race: Race.Brown,
        status: Status.Active,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        facebook: faker.internet.userName(),
        instagram: faker.internet.userName(),
        tiktok: faker.internet.userName(),
        job: faker.person.jobTitle(),
        education_level: 'Superior Incompleto',
        course: 'Tecnologia em Sistemas para a Internet',
        year_start_capoeira: 2017,
        effective_capoeira_training_time: 4,
        year_of_last_belt_promotion: 2024,
        trained_in_a_different_group: false,
        first_capoeira_teacher: faker.person.fullName(),
        belt_id: '098d9b24-8aad-45a6-8ec4-08395facb90c',
        center_id: '24fb194d-23a4-4f38-9e06-9f97f77f193d',
        current_teacher_id: '392be016-28ad-4cf9-a1c2-b623d8a36777',
        nickname: faker.person.firstName(),
        guardian: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
        },
      })
      .set('Accept', 'application/json')
      .expect(201);
    expect(response.body.result).toBeDefined();

    await db('person').where('id', response.body.result).del();
  });

  it('Deve retornar 400 se o nome de um aluno de maior não for informado', function () {
    return request(app)
      .post('/people')
      .send({
        birthday: subYears(new Date(), 20),
      })
      .set('Accept', 'application/json')
      .expect(400);
  });

  it('Deve criar um aluno de menor com sucesso', async function () {
    const response = await request(app)
      .post('/people')
      .set('Accept', 'application/json')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 10),
        guardian: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
        },
      })
      .expect(201);
    expect(response.body.result).toBeDefined();

    await db('person').where('id', response.body.result).del();
  });

  it('Deve retornar 400 quando o nome do responsável do aluno criança não for informado', function () {
    return request(app)
      .post('/people')
      .send({
        name: faker.person.fullName(),
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
      .post('/people')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 10),
        guardian: {
          name: faker.person.fullName(),
        },
      })
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('GET /people/:id', () => {
  it('Deve retornar as informações de um aluno que acabara de ser criado', async function () {
    const response = await request(app)
      .post('/people')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.body.result).toBeDefined();

    request(app).get(`/students/${response.body.result}`).expect(200);

    await db('person').where('id', response.body.result).del();
  });

  it('Deve retornar 400 se o ID de uma pessoa não for encontrado', function () {
    return request(app)
      .get('/people/00000000-0000-0000-0000-000000000000')
      .set('Accept', 'application/json')
      .expect(400);
  });
});

describe('PATCH /people/:id - Atualiza todos os campos', () => {
  it('Deve atualizar todos os campos editáveis de uma pessoa', async () => {
    const createResponse = await request(app)
      .post('/people')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 25).toISOString(),
        gender: Genders.Male,
        race: Race.Brown,
        is_pwd: false,
        status: Status.Active,
        email: faker.internet.email(),
      })
      .expect(201);

    const personId = createResponse.body.result;

    const updatedPayload = {
      name: faker.person.fullName(),
      nickname: faker.person.firstName(),
      gender: Genders.Female,
      is_pwd: true,
      race: Race.Black,
      status: Status.Inactive,
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      facebook: faker.internet.userName(),
      instagram: faker.internet.userName(),
      tiktok: faker.internet.userName(),
      job: faker.person.jobTitle(),
      education_level: 'Superior completo',
      course: faker.word.words(3),
      year_start_capoeira: faker.number.int({ min: 1990, max: 2020 }),
      effective_capoeira_training_time: faker.number.int({ min: 1, max: 30 }),
      year_of_last_belt_promotion: faker.number.int({ min: 2000, max: 2024 }),
      trained_in_a_different_group: faker.company.name(),
      first_capoeira_teacher: faker.person.fullName(),
    };

    await request(app).patch(`/people/${personId}`).send(updatedPayload).expect(200);

    const getResponse = await request(app).get(`/people/${personId}`).expect(200);

    const updatedPerson = getResponse.body.result;

    for (const key of Object.keys(updatedPayload)) {
      expect(String(updatedPerson[key])).toEqual(
        String(updatedPayload[key as keyof typeof updatedPayload])
      );
    }

    await db('person').where('id', personId).del();
  });
});

describe('DELETE /person/:id', () => {
  it('Deve retornar 400 quando um aluno que acabou de ser criado for deletado', async function () {
    const response = await request(app)
      .post('/people')
      .send({
        name: faker.person.fullName(),
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    const personID = response.body.result;

    await request(app).delete(`/people/${personID}`).expect(200);

    request(app).get(`/people/${personID}`).expect(400);

    await db('person').where('id', personID).del();
  });

  it('Deve retornar 400 se o ID do aluno não for encontrado', function () {
    return request(app)
      .del('/people/00000000-0000-0000-0000-000000000000')
      .set('Accept', 'application/json')
      .expect(400);
  });
});
