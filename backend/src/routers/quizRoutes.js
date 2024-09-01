const express = require('express')
const router = express.Router();
const verifyToken = require('../middleware/verifyToken')
const {createQuiz, getQuizByUser, getQuizById, deleteQuiz, updateQuiz, updateImpression, updateResponse} = require('../controllers/quizController');

// post get put delete 

router.get('/', (req, res) => {
    res.json({
        message: ' Quiz Route Is working Fine',
        status: 'Success'
    })
})

router.get('/find' , verifyToken , getQuizByUser())

router.get('/get/:id' , getQuizById())

router.post('/create', verifyToken , createQuiz())

router.put('/update/:id', verifyToken , updateQuiz())

router.put('/updateimpression/:id',  updateImpression())

router.put('/updateresponse/:id',  updateResponse())

router.delete('/delete/:id', verifyToken , deleteQuiz())

module.exports = router 
