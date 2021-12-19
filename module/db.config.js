const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://watermaths:watermaths123@watermaths.elkkx.mongodb.net/nodeTask?retryWrites=true&w=majority',{
    useNewUrlParser:true
}).then(()=>console.log("mongoose is connect"))
.catch((err)=>console.log(err))