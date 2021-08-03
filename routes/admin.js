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
        res.render('admin',{ layout: 'admin',app:application })
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

//QUERY ROUTE
router.get('/queries',async (req,res) =>{
    try{
        const queries = await query.find()
        res.render('queries',{layout:'queries',query:queries})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})










module.exports = router