import { Request, Response, NextFunction } from 'express'

const validateName = (request: Request): [boolean, string] => {
  return [request.body.name.length > 0, 'O nome é obrigatório']
}

const hasBirthday = (request: Request): [boolean, string] => {
  return [request.body.birthday.length > 0, 'A data de nascimento é obrigatória']
}

export function validateStudentCreation(request: Request, response: Response, next: NextFunction) {
  const validations = [
    validateName,
    hasBirthday,
  ]

  validations.reduce((acc, validateFn) => {
    const [isValid, message] = validateFn(request)

    if (!isValid) {
      acc[0] = false
      acc[1].push(message)
    }

    return acc
  }, [true, []] as [boolean, string[]])

  if (!validations[0])
    return response.status(400).json({ message: 'Erro de validação do aluno', validations: validations[1] })

  next();
}
