import db from "../database";
import { HealthData } from "./interfaces";

export async function createRepository({ data }: HealthData) {
  return await db.query(
    `INSERT INTO health (data) VALUES ($1)`, [data],
  );
}