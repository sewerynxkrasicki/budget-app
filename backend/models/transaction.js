class Transaction {
    constructor(id, description, transactionDate, amount, userId, categoryId) {
        this.id = id;
        this.description = description;
        this.transactionDate = transactionDate;
        this.amount = amount;
        this.userId = userId;
        this.categoryId = categoryId;
    }
}

module.exports = Transaction;