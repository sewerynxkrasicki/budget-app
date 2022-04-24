const express = require("express");
const client = require("../config/databaseConfig");
const category = require("../services/category.service");
const router = express.Router();

router.get("", async (req, res) => {
    const categories = await category.getAllCategories();
    if (categories === null) {
        res.status(404).send();
    }
    res.status(200).send(categories);
});

module.exports = router;