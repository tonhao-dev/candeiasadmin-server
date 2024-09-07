class ValidationError {
  message: string = '';
  validations: string[] = [];

  constructor(
    { message, validations }: { message: string; validations: string[] } = {
      message: '',
      validations: [],
    }
  ) {
    this.message = message;
    this.validations = validations;
  }

  get hasError(): boolean {
    return this.validations.length > 0;
  }
}

export { ValidationError };
