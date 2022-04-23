export class User {
  id: number;
  email: string;
  password: string;
  username: string;
  token: string;

  constructor(id: number, email: string, password: string, username: string, token: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.username = username;
    this.token = token;
  }
}