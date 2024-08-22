require('dotenv').config(); // Ensure this is at the top to load environment variables first
const express = require('express');
const cors = require('cors');
const app = express();

const PrivateRoute = require("./src/Routes/PrivateRoutes");
const { db } = require('./src/Common/db.config');
// const Routes = require("./src/Routes/Routes"); // Assuming you have a `Routes.js` file for public routes
// const db = require('./src/db'); // Assuming you have a `db.js` file to handle database connections

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/private", PrivateRoute);
// app.use("/public", Routes);

const PORT = process.env.PORT || 3300;

// db.then(() => {
//   console.log("Connected to Atlas");
  
// }).catch((err) => {
//   console.error("Failed to connect to Atlas", err);
// });

db().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Express is listening at http://localhost:${PORT}`);
});
