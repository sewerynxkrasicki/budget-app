import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, map} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient
  ) {
    const user: string | null = localStorage.getItem('currentUser');
    if (user && !this.getUser()) {
      this.currentUser.next(JSON.parse(user));
    }
  }

  userLogin(email: string, password: string) {
    return this.http.post(`${environment.apiUrl}/api/auth/login`, {email, password}).pipe(
      map((user: any) => {
        let loggedUser: User = user.user;
        loggedUser.token = user.token;
        this.currentUser.next(loggedUser);
        localStorage.setItem('currentUser', JSON.stringify(this.getUser()));
      })
    );
  }

  registerUser(user: User) {
    return this.http.post(`${environment.apiUrl}/api/auth/register`, {user});
  }

  getUser(): User {
    return this.currentUser.getValue() as User;
  }

  isLogged(): boolean {
    return this.currentUser.value == null;
  }

  userLogout(): boolean {
    localStorage.removeItem('currentUser');
    this.currentUser.next(null);
    return true;
  }
}
