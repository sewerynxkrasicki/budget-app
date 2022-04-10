import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BalanceComponent} from "./balance/balance.component";

const routes: Routes = [
  {
    path: '', component: BalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
