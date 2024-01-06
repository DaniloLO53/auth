import db from "../../config/database";


export async function getAdminByEmail(email: string) {
  return await db.query(
    `
      SELECT username, email, password, is_super
      FROM admins
      WHERE email = ($1)
      ORDER BY id
      DESC
      LIMIT 1
    `,
    [email]
  );
}