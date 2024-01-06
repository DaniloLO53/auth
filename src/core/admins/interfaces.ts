export interface Admin {
  username: string;
  email: string;
  password: string;
  is_super: boolean;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface DecodedAdmin {
  user: Omit<Admin, 'password'> & { is_admin: boolean };
}