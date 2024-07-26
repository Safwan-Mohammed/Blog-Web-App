const express = require("express");
const Router = express.Router();
const blogController = require('../controllers/blog')
const authController = require('../controllers/auth')
const verifyTokenMiddleware = require('../middleware/verifyToken')

Router.get('/hello',(req,res) => {
  res.send("Hello, Health check")
})

Router.post('/add-blog', verifyTokenMiddleware.authenticateToken, blogController.addBlog)
Router.get('/get-blog/:id', blogController.getBlog)
Router.get('/get-user-blog/:email', blogController.getUserBlog)
Router.get('/get-all-blogs', blogController.getAllBlogs)
Router.post('/delete-blog', verifyTokenMiddleware.authenticateToken, blogController.deleteBlog)
Router.post('/auth/sign-in', authController.signIn)
Router.post('/auth/sign-up', authController.signUp)
Router.post('/auth/sign-out', authController.signOut)
Router.post('/auth/refresh-token', authController.refreshToken)

module.exports = Router;