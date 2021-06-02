export interface IAuthForm {
  username: string;
  password: string;
  cpassword?: string;
}

export interface IUser {
  id: string;
  name: string;
  token: string;
}
