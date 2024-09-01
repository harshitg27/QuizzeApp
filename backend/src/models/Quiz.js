const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    quizName:{
        type: String
    },
    quizType:{
        type:String
    },
    userId:{
        type : mongoose.ObjectId,
        ref: "User"
    },
    questions : [
        {
            type: Object
        }
    ],
    impression:{
        type:Number ,
        default: 0
    }

},
{timestamps:true})


module.exports = mongoose.model('Quiz' , quizSchema) ;