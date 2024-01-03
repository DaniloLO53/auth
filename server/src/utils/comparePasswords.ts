import { randomBytes, scrypt, timingSafeEqual } from 'crypto';

export function comparePasswords(
  password: string,
  hashedPassword: string
) {
  return new Promise((resolve, reject) => {
    const [hashKey, salt] = hashedPassword.split('.');
    const hashKeyBuff = Buffer.from(hashKey, 'hex');

    scrypt(password, salt, 32, (err, derivedKey) => {
      if (err) reject(err);
      resolve(timingSafeEqual(hashKeyBuff, derivedKey));
    });
  });
}
