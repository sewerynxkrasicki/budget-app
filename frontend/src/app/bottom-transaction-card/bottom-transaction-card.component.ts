import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Category} from "../models/category";
import {CategoryService} from "../services/category.service";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-bottom-transaction-card',
  templateUrl: './bottom-transaction-card.component.html',
  styleUrls: ['./bottom-transaction-card.component.scss']
})
export class BottomTransactionCardComponent implements OnInit, OnDestroy {
  public displayTransactionDialog: boolean = false;
  public title: string = '';
  public amount: number = 0;
  public category: Category | null = null;
  public categories: Category[] = [];
  @Output() public addTransaction: EventEmitter<void> = new EventEmitter();

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void { }

  getAllCategories(): void {
    this.categoryService.getCategories().pipe(takeUntil(this.destroy$)).subscribe((cat: Category[]) => {
      this.categories = cat;
    });
  }

  openTransactionDialog() : void {
    this.vanishControls();
    if (this.categories.length === 0) {
      this.getAllCategories();
    }
    this.displayTransactionDialog = !this.displayTransactionDialog;
  }

  vanishControls(): void {
    this.title = '';
    this.category = null;
    this.amount = 0;
  }

  createTransaction() {
    this.transactionService
      .createTransaction(new Transaction(this.title, this.amount, this.category?.id))
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: Transaction) => {
        this.vanishControls();
        this.displayTransactionDialog = false;
        this.addTransaction.emit();
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

}
