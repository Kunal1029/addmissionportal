const mongoose = require('mongoose')
const EnquirySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    city:{
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
    education:{
        type:String,
        required:true
    },
},{timestamps:true});
const EnquiryModel = mongoose.model('EnquiryDetails',EnquirySchema)
module.exports = EnquiryModel
