import db from "../database";

export async function insertOne(email: string) {
  return await db.query(
    `INSERT INTO health (data) VALUES ($1)`, [email],
  );
}