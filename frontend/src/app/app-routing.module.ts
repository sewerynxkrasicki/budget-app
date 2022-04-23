import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BalanceComponent} from "./balance/balance.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {RegisterComponent} from "./register/register.component";
import {TransactionHistoryComponent} from "./transaction-history/transaction-history.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: BalanceComponent },
      { path: 'transaction-history', component: TransactionHistoryComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
