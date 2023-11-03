const express = require('express')
const app = express();
const port = 1001;
const web = require('./routes/web')
const ConnectDb = require('./db/ConnectDb');
const session = require('express-session')
const flash = require('connect-flash')
const cookieparser = require('cookie-parser')
const fileupload = require("express-fileupload");


//for file upload
app.use(fileupload({useTempFiles: true}));

app.use(cookieparser())

app.use(session({
    secret:'secret',
    cookie : {maxAge:60000},
    resave :false,
    saveUninitialized : false,
}))

app.use(flash());

//engine ejs
app.set('view engine','ejs')

//data provide in req.body
app.use(express.urlencoded({extended:false}))

//css and image
app.use(express.static('public'))

//check db connection
ConnectDb()

//router load
app.use('/',web)

app.listen(port,()=>{
    console.log(`Server start at ${port}`)
})