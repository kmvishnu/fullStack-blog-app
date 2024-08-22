const express = require("express");
const { login, signUp, healthCheck, refreshToken } = require("../Controllers/loginController"); 
const { addBlog, viewAllBlogs, viewAllPrivateBlogs, deleteBlog, editTodo } = require("../Controllers/blogController");
const { validateToken } = require("../Middlewares/validateToken");

const Routes = express.Router();

Routes.get("/viewAllBlogs", viewAllBlogs);
Routes.get("/test",healthCheck)

Routes.post("/login", login);
Routes.post("/register", signUp);
Routes.post("/refreshToken",refreshToken)

Routes.post("/createBlog", [validateToken], addBlog);
Routes.delete("/deleteBlog/:id", [validateToken], deleteBlog);
Routes.put("/editBlog", [validateToken], editTodo);
Routes.get("/viewPrivateBlogs", [validateToken], viewAllPrivateBlogs);

module.exports = Routes;
