const CourseModel = require('../models/CourseModel')
const UserModel = require('../models/NewStudent')

class FC {
    static dashboard = async (req,res) =>{
        try {
            // console.log("my data " , req.data1)
            const {name , image, id } = req.data1;
            const btech = await CourseModel.findOne({userId: id, course: "Bachelors of Technology (B.Tech)"})
            const bca = await CourseModel.findOne({userId: id, course: "Bachelors of Computer & Applications (BCA)"})
            const mca = await CourseModel.findOne({userId: id, course: "Masters of Computer & Applications (MCA)"})
            // console.log(btech)
            res.render('dashboard',{n : name , profile : image , bt : btech , bca : bca , mca: mca})
        } catch (error) {
            console.log(error)
        }
    }
    static login = (req,res) =>{
        try {
            res.render('login',{msg:req.flash('success') , msg1:req.flash('error')})
        } catch (error) {
            console.log(error)
        }
    }
    static registration = (req,res) =>{
        try {
            res.render('registration',{msg:req.flash('error')})
        } catch (error) {   
            console.log(error)
        }
    }
   
    
}

module.exports = FC

