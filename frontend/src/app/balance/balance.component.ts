import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../models/user";
import {AuthService} from "../services/auth.service";
import {BudgetService} from "../services/budget.service";
import {Budget} from "../models/budget";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit, OnDestroy {
  public user: User;
  public budget = 0;

  private destroy$ = new Subject();

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
    this.budgetService.getBudget().pipe(takeUntil(this.destroy$)).subscribe((res: Budget) => {
      this.budget = res.budget;
    });
  }

  transactionAdded() {
    this.getBudget();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }
}
