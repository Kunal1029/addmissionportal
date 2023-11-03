const CourseModel = require('../../models/CourseModel')
const nodemailer = require('nodemailer')
class AdminController{
    static getAllData = async(req,res)=>{
        try{
            const {name , image } = req.data1;
            const data = await CourseModel.find()
            res.render('admin/getalldata',{n : name , profile : image , d: data})
        }
        catch(error){
            console.log(error)
        }
    }

    static updateStatus = async(req,res)=>{
        try{
            // console.log(req.body)
            const {comment, name, email , status} =  req.body;
            await CourseModel.findByIdAndUpdate(req.params.id,{
                comment: comment,
                status: status
            });
            this.sendEmail(name,email,status,comment)
            res.redirect('/admin/getalldata')
        }
        catch(error){
            console.log(error)
        }
    }

    static sendEmail = async (name,email,status,comment) => { //a1
         
        //connenct with the smtp server
        //  console.log(name,email,status,comment) //a3
    
        const transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: { //a4 xdwe magm dyps vkgd
                user: "kunalshivhare2022@gmail.com", //send mail to user
                pass: "krcwkyjslillviwo", //app password of ur email
            },
        });
        const info = await transporter.sendMail({
            from: "ITMGwalior@gmail.com", // sender address
            to: email, // list of receivers
            subject: `ITM university Course ${status}.`, // Subject line //a5
            text: "hello", // plain text body
            html: `Congratulation <b> ${name} </b>your has been approved. Please read ${comment}`, // html body //a6
        });
   };

}


module.exports = AdminController