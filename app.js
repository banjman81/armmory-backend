const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors')
const passport = require("passport");

const app = express();

const indexRouter = require('./routes/index')
const userRouter = require("./routes/users/userRouter")
const gameRouter = require("./routes/games/gamesRouter")

const userJWTLoginStrategy = require('./routes/lib/passport/user-passport');

app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use(passport.initialize())
passport.use("listingUser", userJWTLoginStrategy)

app.use('/', indexRouter)
app.use("/api/users", userRouter)
app.use('/api/games', gameRouter)

module.exports = app