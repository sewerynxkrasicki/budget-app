const express = require("express");
const cors = require("cors");
const passport = require("./config/passportConfig");

const authentication = require("./routes/authentication");

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