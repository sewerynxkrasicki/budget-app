import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../models/transaction";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http: HttpClient
  ) { }

  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${environment.apiUrl}/api/transaction`, {transaction: transaction});
  }
}
