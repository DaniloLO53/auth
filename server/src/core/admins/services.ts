import { comparePasswords } from "../../utils/comparePasswords";
import { customErrorBuilder, httpStatusCodes } from "../../utils/errors";
import { generateJwt } from "../../utils/generateJwt";
import { Admin, Credentials } from "./interfaces";
import { getAdminByEmail } from "./repositories";

export async function createAdmin(user: Admin) {
  return user;
}



export async function loginAdmin(credentials: Credentials) {
  const { email, password } = credentials;
  const { rows: [admin], rowCount} = await getAdminByEmail(email);

  if (rowCount === 0) {
    throw customErrorBuilder({
      message: 'Incorrect credentials',
      statusCode: httpStatusCodes.UNAUTHORIZED
    })
  }
  
  const { password: storedPassword, ...sanitizedAdmin } = admin;
  const passwordValidation = await comparePasswords(password, storedPassword);

  if (!passwordValidation) {
    throw customErrorBuilder({
      message: 'Incorrect credentials',
      statusCode: httpStatusCodes.UNAUTHORIZED
    })
  }

  return generateJwt(sanitizedAdmin);
}