const express = require("express");
const transaction = require("../services/transaction.service");
const budget = require("../services/budget.service");
const category = require("../services/category.service");
const router = express.Router();

router.post("", async (req, res) => {
    const trans = req.body.transaction;
    const createdTransaction = await transaction.createTransaction(req.user.id, trans);
    const categoryName = await category.getCategoryById(trans?.categoryId);
    await budget.budgetTransaction(req.user.id, categoryName.name === 'INCOME' ? trans?.amount : trans?.amount * (-1));
    if (createdTransaction === null) {
        res.status(404).send();
    }
    res.status(200).send(createdTransaction);
});

module.exports = router;