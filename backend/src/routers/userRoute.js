const express = require('express')
const router = express.Router();
const validateUser = require('../middleware/validateUser')
const {
    handleLogin ,
    registerUser 
} = require('../controllers/userController')

// post get put delete 

router.get('/', (req, res) => {
    res.json({
        message: 'User Route Is working Fine',
        status: 'Success'
    })
})

router.post('/register', validateUser, registerUser())

router.post('/login', handleLogin())

module.exports = router 
