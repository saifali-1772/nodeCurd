const mongoose = require('mongoose')

const data = new mongoose.Schema({

    name:String,
    email:String,
    address:String,
    phone:Number

})

module.exports = new mongoose.model("student",data)