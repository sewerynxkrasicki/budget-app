const express = require("express");
const cors = require("cors");
const passport = require("./config/passportConfig");

const authentication = require("./routes/authentication");
const budget = require("./routes/budget");
const category = require("./routes/category");
const transaction = require("./routes/transaction");

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const serverListen = app.listen(process.env.EXPRESS_PORT, () => {
    console.log(
        `API server listening at http://localhost:${process.env.EXPRESS_PORT}`
    );
});

passport.initialize();
app.use("/api/auth", authentication);
app.use("/api/budget", passport.authenticate("jwt", { session: false }), budget);
app.use("/api/category", passport.authenticate("jwt", { session: false }), category);
app.use("/api/transaction", passport.authenticate("jwt", { session: false }), transaction);