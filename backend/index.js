require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const app = express();

const Routes = require("./src/Routes/Routes");
const { db } = require("./src/Common/db.config");
const { connectToRedis } = require("./src/Common/redisClient");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", Routes);

const PORT = process.env.PORT || 3300;

connectToRedis()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch((err) => {
    console.error("Failed to connect to Redis:", err);
  });

db.then(() => {
  console.log("Connected to Atlas");
}).catch((err) => {
  console.error("Failed to connect to Atlas", err);
});

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
