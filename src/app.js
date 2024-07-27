const cors = require('cors');
const express = require("express");
const cookieParser = require('cookie-parser');

const connection = require('./config/database');

const { authRouter } = require("./routes/auth.routes");
const { assetRouter } = require("./routes/assets.routes");

connection()
const app = express();

app.use(cors());


app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/assets', assetRouter);


module.exports = app;