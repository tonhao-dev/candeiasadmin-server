export interface IResponseModel<T = string> {
  message: string;
  result: T;
  validations: string[];
}
