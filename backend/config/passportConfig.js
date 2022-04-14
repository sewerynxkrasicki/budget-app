const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const client = require("./databaseConfig");
const bcrypt = require("bcrypt");
const strategy = passportJWT.Strategy;
const extract = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        async (email, password, success) => {
            const result = await client.query(
                "SELECT id, email, password, username FROM users WHERE email=$1;",
                [email]
            );
            if (result.rows.length === 0) {
                return success(null, false, { message: "Incorrect email." });
            }
            const user = result.rows[0];
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return success(null, false, { message: "Incorrect password." });
            }
            return success(null, user);
        }
    )
);

passport.use(
    new strategy(
        {
            jwtFromRequest: extract.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET,
        },
        async (payload, cb) => {
            const result = await client.query(
                "SELECT id, email, password, username FROM users WHERE email=$1;", [payload.email]
            );
            if (result.rows.length === 0) {
                return cb("Invalid email");
            }
            if (result.rows[0].password !== payload.password) {
                return cb("Invalid password");
            }
            return cb(null, result.rows[0]);
        }
    )
);
module.exports = passport;
