import { HealthData } from "./interfaces";
import { createRepository } from "./repositories";

export async function create(data: HealthData) {
  return await createRepository(data);
}