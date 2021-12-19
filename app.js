const express = require('express')
const { render } = require('express/lib/response')
const app = express()
const port = process.env.PORT || 6000

const data = require('./module/db.config')
const student_sm = require('./module/student_sm')

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {

    student_sm.find((err, doc) => {
        if (!err) {
            res.render('index', {
                data: doc
            })
        } else {
            console.log(err);
        }
    })


})

app.get('/add', (req, res) => {
    res.render('add', {
        error: ""
    })
})

app.get('/update', (req, res) => {
    res.render('update',{
        data:""
    })
})

app.get('/delete', (req, res) => {
    res.render('delete')
})


app.get('/deleteData',(req,res)=>{

    student_sm.findOneAndRemove({_id:req.query.sid},(err,doc)=>{
        if(!err){
            res.redirect('/')
        }else{
            console.log(err)
        }
    })

})

app.post('/findStudent', (req, res) => {

    student_sm.findOne({ _id: req.body.sid }, (err, doc) => {
        if (!err) {
            res.render('update', {
                data: doc
            })
        } else {
            console.log(err)
        }
    })


})

app.post('/updatedata', (req, res) => {

    student_sm.findOneAndUpdate({ _id: req.body.sid }, {
        name: req.body.sname,
        email: req.body.semail,
        address: req.body.saddress,
        phone: req.body.sphone
    }, (err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            console.log(err)
        }
    })

})

app.get('/edit',(req,res)=>{

    student_sm.findOne({_id:req.query.id},(err,doc)=>{
        if(!err){
            res.render('edit',{
                data:doc
            })
        }else{
            console.log(err)
        }
    })
    
})

app.post('/addStudent', (req, res) => {

    // var student_var = new student_sm({

    //     name = req.body.sname,
    //     email = req.body.semail,
    //     address = req.body.saddress,
    //     phone = req.body.sphone

    // })

    // student_var.save((err,doc)=>{
    //     if(!err){
    //         res.redirect('/')
    //     }else{
    //         res.send("error")
    //     }
    // })


    const student_var = new student_sm()
    student_var.name = req.body.sname
    student_var.email = req.body.semail
    student_var.address = req.body.saddress
    student_var.phone = req.body.sphone
    student_var.save((err, doc) => {
        if (!err) {
            res.redirect('/')
        } else {
            res.render('/add', {
                error: "This category is already exist",
                // role: req.session.role
            })
        }
    })

})

app.listen(port, () => {
    console.log('server start on port 6000')
})