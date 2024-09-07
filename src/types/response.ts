export interface IResponseModel<T = string> {
  message: string;
  result: T | null;
  validations: string[];
}
