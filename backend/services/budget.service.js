const client = require("../config/databaseConfig");

const getBudgetByUser = async (userId) => {
    const budget = await client.query("SELECT budget FROM budgets WHERE user_id = $1", [userId])
        .then()
        .catch(err => console.error(`ERROR: ${err.stack}`));
    return budget.rows[0];
}

const createBudgetByUser = async (userId) => {
    await client.query("INSERT into budgets (budget, user_id) VALUES ($1, $2)", [0, userId])
        .then()
        .catch(err => console.error(`ERROR: ${err.stack}`));
}

module.exports = {
    getBudgetByUser: getBudgetByUser,
    createBudgetByUser: createBudgetByUser
}