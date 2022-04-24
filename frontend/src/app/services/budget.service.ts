import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Budget} from "../models/budget";

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(
    private http: HttpClient
  ) { }

  getBudget(): Observable<Budget> {
    return this.http.get<Budget>(`${environment.apiUrl}/api/budget`);
  }
}
