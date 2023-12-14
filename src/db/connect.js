const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv").config();

const db_connection = async () => {
  try {
    return await mongoose.connect(encodeURI(process.env.DB_LOCAL));
  } catch (error) {
    console.log("Error connecting to database");
  }
};

module.exports = db_connection;
