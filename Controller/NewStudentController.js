const StudentModel = require('../models/NewStudent')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2
const nodemailer = require('nodemailer')

cloudinary.config({
    cloud_name: 'dd8z9exss',
    api_key: '243842292493175',
    api_secret: 'aXNApGt5v7lN9cm6WOGIkACXDtI'
});

class NewStudent {
    static StudentInsert = async (req, res) => {
        try {
            // console.log(req.files.image)
            const file = req.files.image //upload folder to image cloudinary
            const imageupload = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: 'profileImage'
            });
            // console.log(imageupload);s
            const { n, e, ph, ps, cps } = req.body
            const user = await StudentModel.findOne({ email: e }) // here 'email ' are comes from model and 'e' comes where user fill email during filling form
            // console.log(user)
            if (user) {
                req.flash('error', 'Email Already Exits')
                res.redirect('/registration')
            }
            else {
                if (n && e && ph && ps && cps) {
                    if (ps === cps) {
                        const hashpassword = await bcrypt.hash(ps, 10)
                        const result = new StudentModel({
                            name: n,
                            email: e,
                            phone: ph,
                            password: hashpassword,
                            confirm_password: hashpassword,
                            image: {
                                public_id: imageupload.public_id,
                                url: imageupload.secure_url
                            }
                        })
                        await result.save()
                        req.flash('success', 'Registration Successfully')
                        res.redirect('/')
                    }
                    else {
                        req.flash('error', 'Password and confirm password does not match')
                        res.redirect('/registration')
                    }
                }
                else {
                    req.flash('error', 'All fields are required')
                    res.redirect('/registration')
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    static verifyLogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            if (email && password) {
                const user = await StudentModel.findOne({ email: email })
                // console.log(user)
                if (user != null) {
                    const IsMatched = await bcrypt.compare(password, user.password) //'password' comes from login and 'user.password' comes from mongodb in which save
                    // console.log(IsMatched)
                    if (IsMatched) {

                        if (user.role == 'admin') {
                            // token generate using id and secret key, logout part 
                            const token = jwt.sign({ ID: user.id }, 'WebdevelopmentMern2023') // WebdevelopmentMern2023 - this can be random text which use as secret key
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/admin/getalldata')
                        }
                        if (user.role == 'student') {
                            // token generate using id and secret key, logout part 
                            const token = jwt.sign({ ID: user.id }, 'WebdevelopmentMern2023') // WebdevelopmentMern2023 - this can be random text which use as secret key
                            // console.log(token)
                            res.cookie('token', token)
                            res.redirect('/dashboard')
                        }

                        // logout end 


                    }
                    else {
                        req.flash('error', 'Email or Password does not exist')
                        res.redirect('/')
                    }
                }
                else {
                    req.flash('error', 'You are not registered user')
                    res.redirect('/')
                }
            }
            else {
                req.flash('error', 'All field are required')
                res.redirect('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    static logOut = async (req, res) => {
        try {
            res.clearCookie('token');
            // res.clearCookie(cookie, {path:'/'});
            res.redirect('/')
        } catch (error) {
            console.log(error)
        }
    }


    // edit profile and change password

    static profile = (req, res) => { //we can create this also on FC , here we created bcoz we applying forgot password and edit details for only resigtration form , not course form
        try {
            const { name, image, id, email, phone } = req.data1;
            // this.sendEmail(email)
            res.render('profile', { n: name, profile: image, e: email, ph: phone, msg: req.flash('error'), msg1: req.flash('success') })
        } catch (error) {
            console.log(error)
        }
    }

    static updatePassword = async (req, res) => { //we can create this also on FC , here we created bcoz we applying forgot password and edit details for only resigtration form , not course form

        try {
            // console.log(req.body)
            const { currentpassword, nps, cnps } = req.body
            const { id } = req.data1
            if (currentpassword && nps && cnps) {
                const user = await StudentModel.findById(id)
                const IsMatched = await bcrypt.compare(currentpassword, user.password)
                if (!IsMatched) {
                    req.flash('error', 'Old Password is Incorrect')
                    res.redirect('/profile')
                }
                else {
                    if (nps != cnps) {
                        req.flash('error', ' New and confirm password does not match')
                        res.redirect('/profile')
                    } else {
                        const newHashPassword = await bcrypt.hash(nps, 10)
                        await StudentModel.findByIdAndUpdate(id, {
                            password: newHashPassword
                        })
                        req.flash('success', ' Password updated successfully')

                        res.redirect('/profile')
                    }
                }
            }
            else {
                req.flash('error', 'All fields are required')
                res.redirect('/profile')
            }

        }

        catch (error) {
            console.log(error)
        }
    }

    static updateProfile = async (req, res) => {
        try {
            // console.log(req.body)
            // console.log(req.files.image)
            const { id } = req.data1; // for getting user id

            const { n, e, ph} = req.body // storing 4 fields data in these variables which should same as name="" attribute in form input fields
            // const { email} = req.data1;
            if (req.files) {
                //we delete previous image from cloudinary for do this we get user image public_id which is unique
                const user = await StudentModel.findById(id)
                const imageID = user.image.public_id
                //console.log(imageID) // public_id of user previous image will get 
                await cloudinary.uploader.destroy(imageID) //image deleted

                //now we update image
                const imagefile = req.files.image //image cum from image input of filled form
                const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, { // imagefile.tempFilePath -  this will get path from our pc tmp folder 
                    folder: 'profileImage' // image will save in cloudinary folder name 'profileimage
                }) // image updated

                var data = { // now we will update this data to studentmodel which update in database also
                    name: n, //right n is variable which defined above and left name is from StudentModel fields
                    email: e, //right e is variable which defined above and left email is from StudentModel fields
                    phone: ph, // """"""
                    image: { // """"""
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url
                    }
                }
                // const operation = "bittu";
                // this.sendEmail(e,operation)
            } else {
                var data = { // now we will update this data to studentmodel which update in database also
                    name: n, //right name is variable which defined above ,also in attribut name="n" of form and left name is from StudentModel fields
                    email: e, //right email is variable which defined above  ,also in attribut name="e"  and left email is from StudentModel fields
                    phone: ph // """""                
                }
                // const operation = "bittu";
                // this.sendEmail(e,operation)
            }
            await StudentModel.findByIdAndUpdate(id, data) //data will we save from user id 
            //console.log(data) //check updated data 
            req.flash('success', "Profile Updated Successfully")

            res.redirect('/profile')

        } catch (error) {
            console.log(error)
        }
    }


    static sendEmail = async (email, operation) => { //a1

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
            subject: `ITM university Security.`, // Subject line //a5
            text: "hello", // plain text body
            html: `Your ${operation} has been updated successfully `, // html body //a6
        });

    };
}

module.exports = NewStudent