const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const apply = require('../models/application')
const query = require('../models/query')
const course = require('../models/courses')
const router = express.Router()

//LANDING PAGE
router.get('/',(req,res)=>{
    try{
        res.render('index')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})


router.get('/online-learning',async (req,res)=>{
    try{
        const courses = await course.find()
        res.render('OL',{course:courses})
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})
router.get('/online-learning/:id',async (req,res)=>{
    try{
        const subjects = await course.findById(req.params.id)
        console.log(subjects.faq);
        res.render('subjects',{sub:subjects})
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})
router.get('/mca',(req,res)=>{
    try{
        res.render('mca')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})

//ABOUT US
router.get('/about',(req,res)=>{
    try{
        res.render('about')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})

//APPLY NOW
router.get('/apply',(req,res)=>{
    try{
        res.render('apply')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})

//CONTACT
router.get('/contact',(req,res)=>{
    try{
        res.render('contact')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})


//APPLY NOW POSTING DATA
router.post('/apply', async(req,res)=>{
    const {name,email,category,code,mobile,state,course,specialisation} = req.body
    try{
        const newApplication = await new apply({
            name,
            email,
            category,
            code,
            mobile,
            state,
            course,
            specialisation
        })
        await newApplication.save()
        res.redirect('/')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})

//CONTACT FORM
router.post('/contact/send', async(req,res) =>{
    const {name,mobile,email,subject,message} = req.body

    const output = `
        <h2>You have a new query</h2>
        <h3>Contact details</h3>
        <ul>
            <li>Name: ${name}</li>
            <li>Contact No.: ${mobile}</li>
            <li>Email: ${email}</li>
            <li>Subject: ${subject}</li>
        </ul>
        <h3>Message:</h3>
        <p>${message}</p>
    `
    try{
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'tigernatraj510@gmail.com', 
                pass: 'NatraJ510'
            },
            tls:{
              rejectUnauthorized:false
            }
        });
        
        let mailOptions = {
            from: '"Nodemailer Contact" <tigernatraj510@gmail.com>', 
            to: 'sncuber510@gmail.com', 
            subject: subject, 
            text: 'Hello world?', 
            html: output 
        };
        
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);   
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });


        const newQuery = await new query({
            name,
            mobile,
            email,
            subject,
            message
        })
        await newQuery.save()
        req.flash('success_msg','Hey! We recieved your query, will get back to you in no time.')
        res.redirect('/contact')
    }catch(err){
        res.status(404).json({success:false})
        console.log(err);
    }
})


module.exports = router