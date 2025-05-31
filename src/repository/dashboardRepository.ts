import { UUID } from 'crypto';
import db from '../database/connection';
import { Gender } from '../entity/gender';
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

  async getAgeDistribution(id: UUID): Promise<Array<{ group: number; count: number }>> {
    const result = await db.raw(
      `
    WITH RECURSIVE recursive_students AS (
      SELECT id, current_teacher_id, birthday
      FROM person
      WHERE current_teacher_id = ? AND deleted_at IS NULL

      UNION ALL

      SELECT p.id, p.current_teacher_id, p.birthday
      FROM person p
      INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
      WHERE p.deleted_at IS NULL
    ),
    ages AS (
      SELECT
        id,
        EXTRACT(YEAR FROM age(CURRENT_DATE, birthday)) AS age
      FROM recursive_students
      WHERE birthday IS NOT NULL
    ),
    grouped AS (
      SELECT
        CASE
          WHEN age < 3 THEN 'baby (0 a 2 anos)'
          WHEN age BETWEEN 3 AND 7 THEN 'infantil (3 a 7 anos)'
          WHEN age BETWEEN 8 AND 13 THEN 'juvenil (8 a 13 anos)'
          WHEN age BETWEEN 14 AND 17 THEN 'adolescente (14 a 17 anos)'
          WHEN age BETWEEN 18 AND 39 THEN 'adulto (18 a 39 anos)'
          ELSE 'master (40 anos ou mais)'
        END AS age_group
      FROM ages
    )
    SELECT age_group, COUNT(*) AS count
    FROM grouped
    GROUP BY age_group
    ORDER BY
      CASE age_group
        WHEN 'baby' THEN 1
        WHEN 'kids' THEN 2
        WHEN 'youth' THEN 3
        WHEN 'teen' THEN 4
        WHEN 'adult' THEN 5
        WHEN 'master' THEN 6
        ELSE 7
      END
    `,
      [id]
    );

    return result.rows.map((row: { age_group: string; count: number }) => ({
      group: row.age_group,
      count: Number(row.count),
    }));
  }

  async getBeltDistribution(id: UUID): Promise<Array<{ belt: string; count: number }>> {
    const result = await db.raw(
      `
    WITH RECURSIVE recursive_students AS (
      SELECT id, current_teacher_id, belt_id
      FROM person
      WHERE current_teacher_id = ? AND deleted_at IS NULL

      UNION ALL

      SELECT p.id, p.current_teacher_id, p.belt_id
      FROM person p
      INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
      WHERE p.deleted_at IS NULL
    )
    SELECT b.name AS belt, COUNT(*) AS count
    FROM recursive_students rs
    INNER JOIN belt b ON rs.belt_id = b.id
    GROUP BY b.name
    `,
      [id]
    );

    return result.rows.map((row: { belt: string; count: number }) => ({
      belt: row.belt,
      count: Number(row.count),
    }));
  }

  async getGenderDistribution(id: UUID): Promise<Array<{ gender: string; count: number }>> {
    const result = await db.raw(
      `
    WITH RECURSIVE recursive_students AS (
      SELECT id, current_teacher_id, belt_id
      FROM person
      WHERE current_teacher_id = ? AND deleted_at IS NULL

      UNION ALL

      SELECT p.id, p.current_teacher_id, p.belt_id
      FROM person p
      INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
      WHERE p.deleted_at IS NULL
    )
    SELECT person.gender AS gender, COUNT(*) AS count
    FROM recursive_students
      INNER JOIN person ON recursive_students.id = person.id
    GROUP BY person.gender
    `,
      [id]
    );

    return result.rows.map((row: { gender: string; count: number }) => ({
      gender: Gender.getGenderName(row.gender),
      count: Number(row.count),
    }));
  }

  async getRaceDistribution(id: UUID): Promise<Array<{ race: string; count: number }>> {
    const result = await db.raw(
      `
    WITH RECURSIVE recursive_students AS (
      SELECT id, current_teacher_id, race
      FROM person
      WHERE current_teacher_id = ? AND deleted_at IS NULL

      UNION ALL

      SELECT p.id, p.current_teacher_id, p.race
      FROM person p
      INNER JOIN recursive_students rs ON p.current_teacher_id = rs.id
      WHERE p.deleted_at IS NULL
    )
    SELECT person.race AS race, COUNT(*) AS count
    FROM recursive_students
      INNER JOIN person ON recursive_students.id = person.id
    GROUP BY person.race
    `,
      [id]
    );

    return result.rows.map((row: { race: number; count: number }) => ({
      race: row.race,
      count: Number(row.count),
    }));
  }
}
