const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');

const connection = require('./config/database');
const { authRouter } = require("./routes/auth.routes");

connection()
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));


app.use(express.json());
app.use(cookieParser());

app.use(express.json());

app.use('/api/auth', authRouter);

module.exports = app;