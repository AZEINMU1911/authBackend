const express = require ('express')
const userController = require ('../Controllers/userController')
const { signup, login } = userController;
const userAuth = require ('../Middlewares/userAuth')


const router = express.Router()

//Authentication endpoint
router.post('/signup', userAuth.checkUserExistance, signup)
router.post('/login',login)

module.exports = router