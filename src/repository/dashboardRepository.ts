import { UUID } from 'crypto';
import db from '../database/connection';

export class DashboardRepository {
  async countStudents(id: UUID): Promise<number> {
    const result = await db.raw(
      `
  WITH RECURSIVE recursive_students AS (
    SELECT id, current_teacher_id
    FROM person
    WHERE current_teacher_id = ? AND deleted_at IS NULL

    UNION ALL

    SELECT p.id, p.current_teacher_id
    FROM person p
    INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
    WHERE p.deleted_at IS NULL
  )
  SELECT COUNT(*) AS total_students FROM recursive_students;
`,
      [id]
    );

    return parseInt(result.rows[0].total_students);
  }
}
