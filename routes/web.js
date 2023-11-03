const express = require('express')
const FrontController = require('../Controller/FrontController')
const router = express.Router();
const NewStudentController = require('../Controller/NewStudentController')
const CourseController = require('../Controller/CourseController')
const EnquiryController = require('../Controller/EnquiryController')
const checkAuth = require('../middleware/auth');
const Admincontroller = require('../Controller/Admin/AdminController');


router.get('/dashboard', checkAuth, FrontController.dashboard)
router.get('/',FrontController.login)
router.get('/registration',FrontController.registration)
router.get('/profile', checkAuth, NewStudentController.profile)
router.get('/coursedisplay', checkAuth ,CourseController.courseDisplay)
router.get('/courseview/:id', checkAuth ,CourseController.courseview)
router.get('/courseedit/:id', checkAuth ,CourseController.courseEdit)
router.get('/courseDelete/:id',CourseController.courseDelete)
// router.get('/coursedisplay',CourseController.EnquiryDisplay)
router.get('/enquirydisplay',EnquiryController.EnquiryDisplay)
//logout
router.get('/logout', NewStudentController.logOut)



//post methods
// router.post('/newuser',FrontController.StudentInsert)
router.post('/newuser',NewStudentController.StudentInsert)
router.post('/course_insert', checkAuth,CourseController.CourseInsert)
router.post('/enquiryform',EnquiryController.Enquiry)
router.post('/course_update/:id', checkAuth,CourseController.courseUpdate)
// login
router.post('/verify_login', NewStudentController.verifyLogin)
router.post('/update_password',checkAuth, NewStudentController.updatePassword)
router.post('/update_profile',checkAuth, NewStudentController.updateProfile)

//admin controller
router.get('/admin/getalldata',checkAuth, Admincontroller.getAllData)
router.post('/update_status/:id',checkAuth, Admincontroller.updateStatus)



module.exports = router