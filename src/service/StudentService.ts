import { IStudentService } from '../interface/student'

class StudentService implements IStudentService {
  async getAll() {
    console.log("Get all students")
  }

  async create() {
    console.log("Create a student")
  }
}

export { StudentService }
