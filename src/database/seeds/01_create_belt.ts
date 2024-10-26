import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await knex('belt').del();
  await knex('belt').insert([
    {
      name: 'cinza',
      title: 'aluno',
      color_hex_code: '#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'verde com pompom cinza',
      title: 'aluno',
      color_hex_code: '#1b9123,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'amarelo com pompom cinza',
      title: 'aluno',
      color_hex_code: '#f8f007,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'laranja com pompom cinza',
      title: 'aluno',
      color_hex_code: '#ff7300,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'azul claro com pompom cinza',
      title: 'aluno',
      color_hex_code: '#00fff6,#5d5d5d',
      belt_type_code: 'BABY',
    },
    {
      name: 'cinza',
      title: 'aluno',
      color_hex_code: '#5d5d5d',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e verde',
      title: 'aluno',
      color_hex_code: '#5d5d5d,#1b9123',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e amarelo',
      title: 'aluno',
      color_hex_code: '#5d5d5d,#f8f007',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e laranja',
      title: 'aluno',
      color_hex_code: '#5d5d5d,#ff7300',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza e azul claro',
      title: 'aluno',
      color_hex_code: '#5d5d5d,#00fff6',
      belt_type_code: 'INFANTIL',
    },
    {
      name: 'cinza',
      title: 'aluno',
      color_hex_code: '#5d5d5d',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'azul claro e verde',
      title: 'aluno',
      color_hex_code: '#00fff6,#1b9123',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'azul claro e amarelo',
      title: 'aluno',
      color_hex_code: '#00fff6,#f8f007',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'azul claro e laranja',
      title: 'aluno',
      color_hex_code: '#00fff6,#ff7300',
      belt_type_code: 'INFANTOJUVENIL',
    },
    {
      name: 'cinza',
      title: 'aluno',
      color_hex_code: '#5d5d5d',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'verde',
      title: 'aluno',
      color_hex_code: '#1b9123',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'amarelo',
      title: 'aluno',
      color_hex_code: '#f8f007',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'amarelo e laranja',
      title: 'aluno',
      color_hex_code: '#f8f007,#ff7300',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'laranja',
      title: 'aluno',
      color_hex_code: '#ff7300',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'azul claro',
      title: 'aluno',
      color_hex_code: '#00fff6',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'verde escuro',
      title: 'graduado',
      color_hex_code: '#154919',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'verde escuro e azul escuro',
      title: 'instrutor',
      color_hex_code: '#154919,#080d86',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'azul escuro',
      title: 'formado',
      color_hex_code: '#080d86',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'roxo',
      title: 'professor',
      color_hex_code: '#8f0581',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'roxo e marrom',
      title: 'contramestre 1° grau',
      color_hex_code: '#8f0581,#480201',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'marrom',
      title: 'contramestre 2° grau',
      color_hex_code: '#480201',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'vermelho',
      title: 'mestre 1° grau',
      color_hex_code: '#ff0000',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'vermelho e branco',
      title: 'mestre 2° grau',
      color_hex_code: '#ff0000,#ffffff',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'branco',
      title: 'mestre 3° grau',
      color_hex_code: '#ffffff',
      belt_type_code: 'ADULTO',
    },
    {
      name: 'azul claro e azul escuro',
      title: 'estagiário',
      color_hex_code: '#00fff6,#080d86',
      belt_type_code: 'ADULTO',
    },
  ]);
}
