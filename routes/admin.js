const express = require('express')
const mongoose = require('mongoose')
const apply = require('../models/application')
const query = require('../models/query')
const course = require('../models/courses')
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

router.delete('/delete/:id',async (req,res) =>{
    try{
        await apply.findByIdAndDelete(req.params.id)
        res.redirect('/admin')
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
        res.render('showApplication',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})
router.delete('/applications/delete/:id',async (req,res) =>{
    try{
        await apply.findByIdAndDelete(req.params.id)
        res.redirect('/admin/applications')
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
router.get('/queries/:id',async (req,res) =>{
    try{
        const queries = await query.findById(req.params.id)
        res.render('showQuery',{layout: 'admin',query:queries})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.delete('/queries/delete/:id',async (req,res) =>{
    try{
        await query.findByIdAndDelete(req.params.id)
        res.redirect('/admin/queries')
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})


//COURSE ROUTE

router.get('/courses',async (req,res) =>{
    try{
        const courses = await course.find()
        res.render('courses',{layout: 'admin',course:courses})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.get('/courses/new',async (req,res) =>{
    try{
        res.render('addCourse',{layout: 'admin'})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})


router.post('/courses/add',async (req,res) =>{
    try{
        const {courseName,overview,vision,mission,elegibility,features,faq} = req.body
        console.log(faq);
        const newCourse = await new course({
            courseName,
            overview,
            vision,
            mission,
            elegibility,
            features
        })
        await newCourse.save()
        res.redirect('/admin/courses')

    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})







module.exports = router