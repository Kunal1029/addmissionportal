const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
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
    birth:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    status:{
        type: String,
        default: 'Pending'
    },
    comment:{
        type: String
    },
    userId:{
        type : String,
        required:true
    }
},{timestamps:true});

const CourseModel = mongoose.model('CourseEnroll',CourseSchema)
module.exports = CourseModel


