const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const mongoUsername = process.env.mongoUsername;
const mongoPassword = process.env.mongoPassword;

console.log("mongoo", mongoUsername, mongoPassword);

const connectionString = `mongodb+srv://${mongoUsername}:${mongoPassword}@blogoshub.ltkqqlf.mongodb.net/?retryWrites=true&w=majority&appName=BlogosHub`;

const options = {
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000,
  family: 4,
};

const db = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) {
      console.log(`Database connection successful to Atlas `);
    }
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = { db };
