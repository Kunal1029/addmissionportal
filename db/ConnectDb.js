const mongoose = require('mongoose')
const liveurl = 'mongodb+srv://kunalshivhare2022:webdeveloper@cluster0.8i6gycq.mongodb.net/?retryWrites=true&w=majority'
const connectdb = () =>{
    // return mongoose.connect('mongodb://127.0.0.1:27017/addmission_portal')
    return mongoose.connect(liveurl)
    .then(()=>{
        console.dir(`Mongodb Connected Successfully`);
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = connectdb