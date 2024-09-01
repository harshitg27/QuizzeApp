import axios from "axios";

const BACKEND_ORIGIN_URL = 'http://localhost:4005/user'
// const BACKEND_ORIGIN_URL = 'https://formbuilderbackend-zay6.onrender.com/user'

const Login = async (email , password) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/login` , {email , password})
        return response
    } catch (error) {
        return error.response ;
    }
}

const Register = async (name , email  , password) =>{
    try {
        const response = await axios.post(`${BACKEND_ORIGIN_URL}/register` , {name , email , password})
        return response
    } catch (error) {
        return error.response ;
    }
}


export {Login , Register }