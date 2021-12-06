const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require('cors')

const app = express();

const indexRouter = require('./routes/index')
const userRouter = require("./routes/users/userRouter")

app.use(cors());
app.options("*", cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.use('/', indexRouter)
app.use("/api/auth/users", userRouter)

module.exports = app