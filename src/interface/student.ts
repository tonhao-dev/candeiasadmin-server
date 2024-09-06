export interface IStudentService {
  getAll(): Promise<void>
  create(): Promise<void>
}
