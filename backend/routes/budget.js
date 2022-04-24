const express = require("express");
const client = require("../config/databaseConfig");
const budget = require("../services/budget.service");
const router = express.Router();

router.get("", async (req, res) => {
    const userBudget = await budget.getBudgetByUser(req.user.id);
    if (userBudget === null) {
        res.status(404).send();
    }
    res.status(200).send(userBudget);
});

module.exports = router;