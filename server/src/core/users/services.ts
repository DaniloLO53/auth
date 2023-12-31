import { ISignUp } from "../../authentication/auth/interfaces";
import { countByUsername, findByEmail, insertUser } from "./respositories";
import argon2 from 'argon2';
import slugify from 'slugify';

export async function create(data: Omit<ISignUp, 'passsword2'>) {
  const { email, name, password1: pass } = data;

  await checkEmailUniqueness(email);
  await insertUser({
    email,
    username: await generateUsername(name),
    password: await argon2.hash(pass)
  });
}

export async function checkEmailUniqueness(email: string) {
  await findByEmail(email);
}

export async function generateUsername(name: string) {
  const  slugifyOptions = {
    lower: true,
    replacement: '.',
    remove: /['_\.\-]/g
  };
  const tempUsername = slugify(name, slugifyOptions);
  const count = await countByUsername(tempUsername);

  if (count > 0) {
    return `${tempUsername}${count}`;
  }
  return tempUsername;
}