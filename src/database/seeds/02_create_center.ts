import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('center').del();
  await knex('center').insert([
    {
      name: 'Grupo Candeias de Capoeira do Acre',
      address: 'R. José Luís, 358 - Santa Inês, Rio Branco - AC, 69907-677',
      latitude: -10.0084408,
      longitude: -67.794181,
    },
    {
      name: 'Instituto Federal do Acre - Campus Rio Branco',
      address: 'Av. Brasil, 920 - Xavier Maia, Rio Branco - AC',
      latitude: -9.9310185,
      longitude: -67.8177193,
    },
    {
      name: 'Esc Instituto De Educacao Lourenco Filho',
      address: 'Av. Getúlio Vargas, 2855 - Vila Ivonete, Rio Branco - AC, 69908-650',
      latitude: -9.9533788,
      longitude: -67.8192741,
    },
    {
      name: 'Grupo de Capoeira Candeias Feijó - Antiga ONG do Bairro Nair Araújo',
      address: 'R. Nair Macambira, 95, Feijó - AC, 69960-000',
      latitude: -8.1769991,
      longitude: -70.355371,
    },
    {
      name: 'Academia de Jiu-jitsu Ray Perez',
      address: 'Sen. Guiomard - AC, 69925-000',
      latitude: -10.1483255,
      longitude: -67.7409763,
    },
  ]);
}
