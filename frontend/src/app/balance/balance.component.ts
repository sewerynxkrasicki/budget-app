import { Component, OnInit } from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {BudgetService} from "../services/budget.service";
import {Budget} from "../models/budget";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  public user: User;
  public budget = 0;

  constructor(
    private authService: AuthService,
    private budgetService: BudgetService
  ) {
    this.user = authService.getUser();
  }

  ngOnInit(): void {
    this.getBudget();
  }

  getBudget(): void {
    this.budgetService.getBudget().subscribe((res: Budget) => {
      this.budget = res.budget;
    });
  }



}
