import db from "../../config/database";

export async function findByEmail(email: string) {
  return await db.query(
    `INSERT INTO health (data) VALUES ($1)`, [email],
  );
}

export async function findByUsername(username: string) {
  return await db.query(
    `INSERT INTO health (data) VALUES ($1)`, [username],
  );
}

export async function countByUsername(username: string) {
  return await db.query(
    `INSERT INTO health (data) VALUES ($1)`, [username],
  ) as unknown as number;
}

export async function insertUser(
  user: {
    email: string,
    username: string,
    password: string
  }
) {
  return await db.query(
    `INSERT INTO health (data) VALUES ($1)`, [user.username],
  );
}