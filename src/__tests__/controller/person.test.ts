import request from 'supertest';
import { app } from '../../server';
import { subYears } from 'date-fns';
import { Genders } from '../../enum/gender';
import { Race } from '../../enum/race';
import { Status } from '../../enum/status';
import { faker } from '@faker-js/faker';

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
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);
    expect(response.body.result).toBeDefined();
  });

  it('Deve criar um aluno criança com todas as informações completas', async function () {
    const response = await request(app)
      .post('/people')
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
      .expect(201);
    expect(response.body.result).toBeDefined();
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
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 10),
        guardian: {
          name: faker.person.fullName(),
          phone: faker.phone.number(),
        },
      })
      .expect(201);
    expect(response.body.result).toBeDefined();
  });

  it('Deve retornar 400 quando o nome do responsável do aluno criança não for informado', function () {
    return request(app)
      .post('/people')
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
      .post('/people')
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

describe('GET /people/:id', () => {
  it('Deve retornar as informações de um aluno que acabara de ser criado', async function () {
    const response = await request(app)
      .post('/people')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(response.body.result).toBeDefined();
    request(app).get(`/students/${response.body.result}`).expect(201);
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
        name: 'Original Name',
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
      name: 'Updated Name',
      nickname: 'CapoeiraNick',
      gender: Genders.Female,
      is_pwd: true,
      race: Race.Black,
      status: Status.Inactive,
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      phone: faker.phone.number(),
      facebook: 'updated.fb',
      instagram: 'updated.ig',
      tiktok: 'updated.tt',
      job: 'Professor',
      education_level: 'Superior completo',
      course: 'Educação Física',
      year_start_capoeira: 2005,
      effective_capoeira_training_time: 15,
      year_of_last_belt_promotion: 2020,
      trained_in_a_different_group: 'Grupo Raízes',
      first_capoeira_teacher: 'Mestre João',
    };

    await request(app).patch(`/people/${personId}`).send(updatedPayload).expect(200);

    const getResponse = await request(app).get(`/people/${personId}`).expect(200);

    const updatedPerson = getResponse.body.result;

    for (const key of Object.keys(updatedPayload)) {
      expect(String(updatedPerson[key])).toEqual(
        String(updatedPayload[key as keyof typeof updatedPayload])
      );
    }
  });
});

describe('DELETE /person/:id', () => {
  it('Deve retornar 400 quando um aluno que acabou de ser criado for deletado', async function () {
    const response = await request(app)
      .post('/people')
      .send({
        name: 'Luis Santiago',
        birthday: subYears(new Date(), 20).toISOString(),
        gender: Genders.Male,
        email: faker.internet.email(),
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    const personID = response.body.result;
    await request(app).delete(`/people/${personID}`);
    request(app).get(`/people/${personID}`).expect(400);
  });

  it('Deve retornar 400 se o ID do aluno não for encontrado', function () {
    return request(app)
      .delete('/people/00000000-0000-0000-0000-000000000000')
      .set('Accept', 'application/json')
      .expect(400);
  });
});
