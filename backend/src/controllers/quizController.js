const QuizModel = require('../models/Quiz');
const { options } = require('../routers/quizRoutes');

function createQuiz() {
    return async(req , res , next) =>{
        try {
            const { quizName , quizType , questions } = req.body;
            const quiz = new QuizModel({
                quizName,
                quizType,
                userId : req.user_id,
                questions
            })
            await quiz.save()
            res.status(201).json({
                status:"Success",
                quiz
            })
        } catch (error) { 
            next('Error For Creating Quiz' , error)
        }
    }
}

function getQuizByUser (){
    return async(req , res , next) =>{
        try {
            const userId = req.user_id ;
            const quizes = await QuizModel.find({userId })
            if(!quizes){
                res.status(400).json({
                    status:'Failed',
                    message:'No Form Exist'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                quizes
            })
        } catch (error) {
            next("error For Fetching Quizes", error);
        }
    }
}

function getQuizById (){
    return async(req , res , next) =>{
        try {
            const QuizId = req.params.id ;
            const Quiz = await QuizModel.findById(QuizId)
            if(!Quiz){
                res.status(400).json({
                    status:'Failed',
                    message:'Incorrect Quiz Id'
                })
                return
            }
            res.status(200).json({
                status:'Success' ,
                Quiz
            })
        } catch (error) {
            next("Invalid Url or Quiz", error);
        }
    }
}

function updateQuiz() {
    return async(req , res , next) =>{
        try {
            const quizId = req.params.id ;
            const {quizName , quizType , questions , userId} = req.body;
            if(userId != req.user_id){
                res.status(400).json({
                    status:'Falied',
                    message:'Invaid User You Do Not Update This Form'
                })
                return         
            }
            
            const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId , {
                quizName ,
                quizType ,
                questions 
            })
            res.status(201).json({
                status:"Success",
                updatedQuiz
            })
        } catch (error) { 
            next('Error For updating Quiz' , error)
        }
    }
}

function updateImpression (){
    return async(req , res , next) =>{
        try {
            const quizId = req.params.id ;
            const existingQuiz = await QuizModel.findById(quizId)
            const impr = existingQuiz.impression
            const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId , {
                impression : impr + 1
            })
            res.status(201).json({
                status:'Success' ,
                impression : impr + 1
            })
        } catch (error) {
            next("Invalid Quiz", error);
        }
    }
}

function updateResponse (){
    return async(req , res , next) =>{
        try {
            const {responseArr} = req.body
            // console.log(responseArr)
            const quizId = req.params.id ;
            const existingQuiz = await QuizModel.findById(quizId)
            if(!existingQuiz){
                res.status(400).json({
                    status:'Failed' ,
                    message: "Wrong Quiz Id"
                })
                return
            }
            let questions = existingQuiz.questions
            if(existingQuiz.quizType === 'answer'){
                questions = questions.map((question , index) =>{
                    if(responseArr[index]){
                        return {...question , correctAttempt : question.correctAttempt + 1}
                    }else{
                        return {...question ,   inCorrectAttempt : question.inCorrectAttempt + 1}
                    }
                })
            }
            if(existingQuiz.quizType === 'poll'){
                questions = questions.map((question , index) =>{
                    let options = question.options
                    options = [...options.slice(0 , responseArr[index]) , {...options[responseArr[index]] , selectedNumber: options[responseArr[index]].selectedNumber + 1} , ...options.slice(responseArr[index] + 1)]
                    return {...question , options}
                })
            }
            const updatedQuiz = await QuizModel.findByIdAndUpdate(quizId , {
                questions
            })
            res.status(201).json({
                status:'Success' ,
                updatedQuiz
            })
        } catch (error) {
            next("Invalid Quiz", error);
        }
    }
}

function deleteQuiz (){
    return async(req , res , next) =>{
        try {
            const quizId = req.params.id ;
            await QuizModel.findByIdAndDelete(quizId)
            res.status(201).json({
                status:'Success',
                message:'Form Delete Successfully',
                quizId
            })
        } catch (error) {
            next("Error For Deleting Quiz" ,error)
        }
    }
}

module.exports = {
    createQuiz ,
    getQuizByUser,
    getQuizById ,
    updateQuiz ,
    updateImpression ,
    updateResponse ,
    deleteQuiz 
}