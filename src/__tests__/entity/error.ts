import { ValidationError } from '../../entity/error';

describe('Erro de Validação', () => {
  it('deve criar uma instância com valores padrão', () => {
    const error = new ValidationError();

    expect(error.message).toBe('');
    expect(error.validations).toEqual([]);
    expect(error.hasError).toBe(false);
  });

  it('deve criar uma instância com mensagem e validações personalizadas', () => {
    const error = new ValidationError({
      message: 'Entrada inválida',
      validations: ['Nome é obrigatório', 'Email é inválido'],
    });

    expect(error.message).toBe('Entrada inválida');
    expect(error.validations).toEqual(['Nome é obrigatório', 'Email é inválido']);
    expect(error.hasError).toBe(true);
  });

  it('deve retornar falso para hasError quando não há validações', () => {
    const error = new ValidationError({ message: 'Sem erros', validations: [] });

    expect(error.hasError).toBe(false);
  });

  it('deve retornar verdadeiro para hasError quando há validações', () => {
    const error = new ValidationError({
      message: 'Erros presentes',
      validations: ['Erro 1'],
    });

    expect(error.hasError).toBe(true);
  });
});
