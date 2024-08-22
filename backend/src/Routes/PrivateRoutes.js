const express = require('express');
const { login, signUp } = require('../Controllers/loginController'); // Ensure correct import

const PrivateRoute = express.Router();

PrivateRoute.post("/login", login); // Use the `login` function as the handler
PrivateRoute.post("/register",signUp)

module.exports = PrivateRoute; // Export the router directly
