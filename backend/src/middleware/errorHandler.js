
const errorHandler = ( err , req , res , next) =>{
    console.log(err)
    res.status(500).json({
        status: 'Failed',
        message: err
    })
}

module.exports = errorHandler ;