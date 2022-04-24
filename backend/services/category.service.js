const client = require("../config/databaseConfig");

const getAllCategories = async () => {
    const categories = await client.query("SELECT * FROM category")
        .then()
        .catch(err => console.error(`ERROR: ${err.stack}`));
    return categories.rows;
}

const getCategoryById = async (categoryId) => {
    const categories = await client.query("SELECT * FROM category WHERE id = $1", [categoryId])
        .then()
        .catch(err => console.error(`ERROR: ${err.stack}`));
    return categories.rows[0];
}

module.exports = {
    getAllCategories: getAllCategories,
    getCategoryById: getCategoryById
}