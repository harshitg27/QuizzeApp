const mongoose  = require('mongoose')
const {Schema} = require('mongoose')
// schema of users(name , email  , password)
const userSchema = new Schema({
    name: {
        type: String,
        required : true
    },
    email: {
        type: String, // regex to parse for validate email
        required : true,
        unique: true ,
        lowercase : true
    },
    password: {
        type: String,
        required:true
    }
},
{timestamps:true})

module.exports = mongoose.model('User' , userSchema) ;