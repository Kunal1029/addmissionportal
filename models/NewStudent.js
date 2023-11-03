const { default: mongoose } = require('mongoose')
const newUser = require('mongoose')
const NewStudentSchema = new newUser.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirm_password:{
        type:String,
        required:true
    },
    image:{
        public_id: {
            type: String,
        },
        url: {
            type: String
        }
    },
    role:{
        type: String,
        default: 'student'
    }
},{timestamps:true})

const NewStudentModel = mongoose.model('newStudent',NewStudentSchema)
module.exports = NewStudentModel
