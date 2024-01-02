import { ISignUp } from "./interfaces";
import { insertOne } from "./repositories";
import createError from 'http-errors';

export async function create(data: ISignUp) {
  const { email, name, password1, password2 } = data;

  console.log(email)

  comparePasswords(password1, password2);

  return await insertOne(email);
}

export function comparePasswords(password1: string, password2: string) {
  if (password1 !== password2) {
    throw createError(400, 'Passwords must match');
  }
}