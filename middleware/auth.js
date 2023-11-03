const jwt = require('jsonwebtoken')
const NewStudentModel = require('../models/NewStudent')
const checkAuth =  async (req,res,next) =>{
    // console.log('hello middleware')
    const {token} = req.cookies
    // console.log(token)
    if(!token){
        req.flash('error','unauthorised user ')
        res.redirect('/')
    }
    else{
        const verifyToken = jwt.verify(token,'WebdevelopmentMern2023')
        // console.log(verifyToken)
        const data = await NewStudentModel.findOne({_id:verifyToken.ID})
        // console.log(data)
        req.data1 = data;
        next()
    }
}

module.exports = checkAuth

