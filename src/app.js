const express = require('express');
const dotenv = require('dotenv');
const app = express();
const db_connection = require('./db/connect');
const productRouter = require('./routes/product.route');


app.use(express.json());
app.use("/api", productRouter);
db_connection();

module.exports = app;