import { PersonRecord } from '../types/table/personTable';

export class Record {
  constructor(student: PersonRecord) {
    return {
      id: student.id,
      name: student.name,
      birthday: student.birthday,
      gender: student.gender,
      phone: student.phone,
      guardian: {
        name: student.guardian_name,
        phone: student.guardian_phone,
      },
      nickname: student.nickname,
      is_pwd: student.is_pwd,
      race: student.race,
      status: student.status,
      email: student.email,
      address: student.address,
      facebook: student.facebook,
      instagram: student.instagram,
      tiktok: student.tiktok,
      job: student.job,
      education_level: student.education_level,
      course: student.course,
      belt: {
        name: student.belt_name,
        title: student.belt_title,
        color_hex_code: student.belt_color_hex_code,
        belt_type_name: student.belt_type_name,
      },
      year_start_capoeira: student.year_of_last_belt_promotion,
      effective_capoeira_training_time: student.effective_capoeira_training_time,
      year_of_last_belt_promotion: student.year_of_last_belt_promotion,
      trained_in_a_different_group: student.trained_in_a_different_group,
      first_capoeira_teacher: student.first_capoeira_teacher,
      center_name: student.center_name,
      current_teacher_id: student.current_teacher_id,
    };
  }
}
