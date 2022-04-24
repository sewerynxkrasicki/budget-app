export class Transaction {
  id: number | undefined;
  description: string;
  transactionDate: number | undefined;
  amount: number;
  userId: number | undefined;
  categoryId: number | undefined;


  constructor(description: string, amount: number, categoryId: number | undefined, id?: number, transactionDate?: number, userId?: number) {
    this.id = id;
    this.description = description;
    this.transactionDate = transactionDate;
    this.amount = amount;
    this.userId = userId;
    this.categoryId = categoryId;
  }
}