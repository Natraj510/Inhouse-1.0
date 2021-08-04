const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const apply = require('../models/application')
const query = require('../models/query')
const router = express.Router()


//ADMIN-APPLICATION ROUTE
router.get('/',async (req,res) =>{
    try{
        const application = await apply.find()
        res.render('adminHome',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

//APPLICATION ROUTE
router.get('/applications',async (req,res) =>{
    try{
        const application = await apply.find()
        res.render('application',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})
router.get('/applications/:id',async (req,res) =>{
    try{
        const application = await apply.findById(req.params.id)
        console.log(application.name);
        res.render('show',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

//QUERY ROUTE
router.get('/queries',async (req,res) =>{
    try{
        const queries = await query.find()
        res.render('queries',{layout: 'admin',query:queries})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})










module.exports = router