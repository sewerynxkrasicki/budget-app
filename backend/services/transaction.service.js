const client = require("../config/databaseConfig");

const createTransaction = async (userId, trans) => {
    const transaction = await client.query(
        "INSERT INTO transactions (description, trans_date, amount, user_id, category_id) " +
        "VALUES ($1, current_timestamp, $2, $3, $4) RETURNING *", [trans?.description, trans?.amount, userId, trans.categoryId])
        .then()
        .catch(err => console.error(`ERROR: ${err.stack}`));
    return transaction.rows[0];
};

const getTransactionsByUser = async (userId) => {
    const transactions = await client.query("SELECT * FROM transaction WHERE user_id = $1", [userId])
        .then()
        .catch(err => console.error(`ERROR: ${err.stack}`));
    return transactions.rows;
}

module.exports = {
  createTransaction: createTransaction,
  getTransactionsByUser: getTransactionsByUser
};