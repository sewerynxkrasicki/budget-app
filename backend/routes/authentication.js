const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("../config/passportConfig");
const client = require("../config/databaseConfig");
const router = express.Router();
const budget = require("../services/budget.service");

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(404).json({message: "User not found"});
        }
        req.login(user, {session: false}, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign(user, process.env.SECRET);
            return res.json({user, token});
        });
    })(req, res);
});

router.post("/register", async (req, res, next) => {
    const {username, password, email} = req.body.user;
    const salt = await bcrypt.genSalt(10);
    const encodePassword = await bcrypt.hash(password, salt);
    await client.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (error, result) => {
            if (error) {
                throw error;
            }
            if (!result.rows[0]) {
                client.query(
                    `SELECT * FROM users WHERE username = $1`,
                    [username],
                    (error, result2) => {
                        if (error) {
                            console.error(`ERROR: ${error}`)
                        }
                        if (!result2.rows[0]) {
                            client.query(
                                `INSERT INTO users (email, password, username) VALUES ($1, $2, $3) RETURNING *;`,
                                [email, encodePassword, username],
                                async (error, result) => {
                                    if (error) {
                                        console.error(`ERROR: ${error}`)
                                    }
                                    await budget.createBudgetByUser(result.rows[0].id);
                                    res.status(200).send(result.rows);
                                }
                            );
                        } else {
                            res.status(200).send({nickname: false});
                        }
                    }
                );
            } else {
                res.status(200).send({email: false});
            }
        }
    );
});

module.exports = router;
