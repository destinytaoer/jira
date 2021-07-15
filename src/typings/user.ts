export interface IAuthForm {
  username: string;
  password: string;
  cpassword?: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
