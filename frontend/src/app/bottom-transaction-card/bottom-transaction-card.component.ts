import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Category} from "../models/category";
import {CategoryService} from "../services/category.service";
import {TransactionService} from "../services/transaction.service";
import {Transaction} from "../models/transaction";

@Component({
  selector: 'app-bottom-transaction-card',
  templateUrl: './bottom-transaction-card.component.html',
  styleUrls: ['./bottom-transaction-card.component.scss']
})
export class BottomTransactionCardComponent implements OnInit {
  public displayTransactionDialog: boolean = false;
  public title: string = '';
  public amount: number = 0;
  public category: Category | null = null;
  public categories: Category[] = [];
  @Output() public addTransaction: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((cat: Category[]) => {
      console.log(cat)
      this.categories = cat;
    });
  }

  openTransactionDialog() : void {
    this.vanishControls();
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
      .subscribe((res: Transaction) => {
        this.vanishControls();
        this.displayTransactionDialog = false;
        this.addTransaction.emit();
      });
  }
}
