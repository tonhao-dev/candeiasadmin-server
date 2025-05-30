import { UUID } from 'crypto';
import db from '../database/connection';
import { Belt } from '../types/table/belt';
import { BeltTable } from '../types/table/beltTable';

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

  async countOfNewStudents(id: UUID): Promise<number> {
    const result = await db.raw(
      `
    WITH RECURSIVE recursive_students AS (
      SELECT id, current_teacher_id, created_at
      FROM person
      WHERE current_teacher_id = ? AND deleted_at IS NULL AND created_at >= NOW() - INTERVAL '90 days'
      UNION ALL
      SELECT p.id, p.current_teacher_id, p.created_at
      FROM person p
      INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
      WHERE p.deleted_at IS NULL AND p.created_at >= NOW() - INTERVAL '90 days'
    )
    SELECT COUNT(*) AS total_new_students FROM recursive_students;
    `,
      [id]
    );
    return parseInt(result.rows[0].total_new_students);
  }

  async getHighestBeltInNetwork(id: UUID): Promise<Belt> {
    const result = await db.raw(
      `
    WITH RECURSIVE recursive_students AS (
      SELECT id, current_teacher_id, created_at
      FROM person
      WHERE current_teacher_id = ? AND deleted_at IS NULL AND created_at >= NOW() - INTERVAL '90 days'
      UNION ALL
      SELECT p.id, p.current_teacher_id, p.created_at
      FROM person p
      INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
      WHERE p.deleted_at IS NULL AND p.created_at >= NOW() - INTERVAL '90 days'
    )
    SELECT belt.* FROM recursive_students
      INNER JOIN person ON recursive_students.id = person.id
      INNER JOIN belt ON person.belt_id = belt.id
    ORDER BY belt.order DESC
    LIMIT 1;
    `,
      [id]
    );

    return result.rows[0] as BeltTable;
  }
}
