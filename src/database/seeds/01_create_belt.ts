import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('belt').del();
  await knex('belt').insert([
    {
      name: 'cinza',
      title: 'aluno',
      colorHexCode: '#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'verde com pompom cinza',
      title: 'aluno',
      colorHexCode: '#1b9123,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'amarelo com pompom cinza',
      title: 'aluno',
      colorHexCode: '#f8f007,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'laranja com pompom cinza',
      title: 'aluno',
      colorHexCode: '#ff7300,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'azul claro com pompom cinza',
      title: 'aluno',
      colorHexCode: '#00fff6,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'cinza',
      title: 'aluno',
      colorHexCode: '#5d5d5d',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e verde',
      title: 'aluno',
      colorHexCode: '#5d5d5d,#1b9123',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e amarelo',
      title: 'aluno',
      colorHexCode: '#5d5d5d,#f8f007',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e laranja',
      title: 'aluno',
      colorHexCode: '#5d5d5d,#ff7300',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e azul claro',
      title: 'aluno',
      colorHexCode: '#5d5d5d,#00fff6',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza',
      title: 'aluno',
      colorHexCode: '#5d5d5d',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'azul claro e verde',
      title: 'aluno',
      colorHexCode: '#00fff6,#1b9123',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'azul claro e amarelo',
      title: 'aluno',
      colorHexCode: '#00fff6,#f8f007',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'azul claro e laranja',
      title: 'aluno',
      colorHexCode: '#00fff6,#ff7300',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'cinza',
      title: 'aluno',
      colorHexCode: '#5d5d5d',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'verde',
      title: 'aluno',
      colorHexCode: '#1b9123',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'amarelo',
      title: 'aluno',
      colorHexCode: '#f8f007',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'amarelo e laranja',
      title: 'aluno',
      colorHexCode: '#f8f007,#ff7300',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'laranja',
      title: 'aluno',
      colorHexCode: '#ff7300',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'azul claro',
      title: 'aluno',
      colorHexCode: '#00fff6',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'verde escuro',
      title: 'graduado',
      colorHexCode: '#154919',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'verde escuro e azul escuro',
      title: 'instrutor',
      colorHexCode: '#154919,#080d86',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'azul escuro',
      title: 'formado',
      colorHexCode: '#080d86',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'roxo',
      title: 'professor',
      colorHexCode: '#8f0581',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'roxo e marrom',
      title: 'contramestre 1° grau',
      colorHexCode: '#8f0581,#480201',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'marrom',
      title: 'contramestre 2° grau',
      colorHexCode: '#480201',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'vermelho',
      title: 'mestre 1° grau',
      colorHexCode: '#ff0000',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'vermelho e branco',
      title: 'mestre 2° grau',
      colorHexCode: '#ff0000,#ffffff',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'branco',
      title: 'mestre 3° grau',
      colorHexCode: '#ffffff',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'azul claro e azul escuro',
      title: 'estagiário',
      colorHexCode: '#00fff6,#080d86',
      belt_type_code: 'ADULTO',
    },
  ]);
}
