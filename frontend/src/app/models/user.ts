export class User {
  id: number | undefined;
  email: string;
  password: string;
  username: string;
  token: string | undefined;

  constructor(email: string, password: string, username: string, token?: string, id?: number) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.token = token;
  }
}