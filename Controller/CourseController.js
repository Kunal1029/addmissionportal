const CourseModel = require('../models/CourseModel')
const nodemailer = require('nodemailer')

class NewEnrollment {
    static CourseInsert = async (req, res) => {
        try {
            // console.log(req.body);
            const { id } = req.data1; // req.data1 comes from auth ,  we getting user id here from auth only if we add checkauth in courseinsert post method in web.js 
            const { name, email, phone, DOB, Gender, address, program } = req.body
            const result = new CourseModel({
                name: name,
                email: email,
                phone: phone,
                birth: DOB,
                gender: Gender,
                address: address,
                course: program,
                userId: id
            })
            await result.save();

            //calling sendemail() function
            this.sendEmail(name,email,program) //a2 //(name,email,program) should same as form name="" attribute

            res.redirect('/Coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static courseDisplay = async (req, res) => {
        try {
            // const data = await CourseModel.find()
            // res.render('coursedisplay',{d : data})
             
            // console.log("display ",data)
           
            // const data = await CourseModel.findById(req.params.id)
            // const { name, image } = req.data1;
            const {name , image , id} = req.data1 
            const data = await CourseModel.find({userId: id})
            // console.log(id)
            // console.log(data)
            // const { email, phone, DOB, Gender, address, program } = req.body
            // const btech = await CourseModel.find({course : 'Bachelors of Technology (B.Tech)'})
            // const bca = await CourseModel.find({course : 'Bachelors of Technology (B.Tech)'})
            // const mca = await CourseModel.find({course : 'Bachelors of Computer & Applications (BCA)'})
            // console.log(req.params.id)
            // res.render('Coursedisplay', { d: data, n: name, profile: image , bt : btech , mca: mca , bca : bca  })
            res.render('coursedisplay', { d: data, n: name, profile: image  })
        } catch (error) {
            console.log(error)
        }
    }
    static courseview = async (req, res) => {
        try {
            // console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            const { name, image } = req.data1;
            res.render('courseview', { d: data, n: name, profile: image })
        } catch (error) {
            console.log(error)
        }
    }
    static courseEdit = async (req, res) => {
        try {
            // console.log(req.params.id)
            const data = await CourseModel.findById(req.params.id)
            const { name, image } = req.data1;
            res.render('courseedit', { d: data, n: name, profile: image })
        } catch (error) {
            console.log(error)
        }
    }
    static courseUpdate = async (req, res) => {
        try {
            // console.log(req.params.id)
            // console.log(req.body)
            const { name, email, phone, DOB, Gender, address, program } = req.body
            const data = await CourseModel.findByIdAndUpdate(req.params.id, {
                name: name,
                email: email,
                phone: phone,
                birth: DOB,
                gender: Gender,
                address: address,
                course: program
            })
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }
    static courseDelete = async (req, res) => {
        try {
            // console.log(req.params.id)
            await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }


    static sendEmail = async (name, email, program) => { //a1
         
        //connenct with the smtp server
        //  console.log(name,email,program) //a3
        //  console.log(typeof email)
        //  console.log(email, " email variable")
        //  const e = email;
        //  console.log(e+" " + typeof e)
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
            subject: `ITM university Course Enrollment.`, // Subject line //a5
            text: "hello", // plain text body
            html: `Congratulation <b>${name}</b> for successful Course Enrollment of ${program}`, // html body //a6
        });
   };

}

module.exports = NewEnrollment
