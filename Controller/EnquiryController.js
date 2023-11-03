const EnquiryModel = require('../models/EnquiryModel')
class NewEnquiry{
    static Enquiry = async(req,res)=>{
        try {
            // console.log(req.body)
            const {name,city,email,phone,education} = req.body
            const result = new EnquiryModel({
                name:name,
                city:city,
                email:email,
                phone:phone,
                education:education
            })
            await result.save()
            res.redirect('/dashboard')
        } catch (error) {
            console.log(error)
        }
    }
    static EnquiryDisplay = async(req,res)=>{
        try {
            const enquiredata = await EnquiryModel.find()
            res.render('enquirydisplay',{ed : enquiredata})
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = NewEnquiry






