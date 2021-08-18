const express = require('express')
const mongoose = require('mongoose')
const apply = require('../models/application')
const query = require('../models/query')
const course = require('../models/courses')
const user = require('../models/users')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

const { authenticated } = require('../configs/auth')


//ADMIN-APPLICATION ROUTE
router.get('/',authenticated,async (req,res) =>{
    try{
        const application = await apply.find()
        res.render('adminHome',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.delete('/delete/:id',authenticated,async (req,res) =>{
    try{
        await apply.findByIdAndDelete(req.params.id)
        res.redirect('/admin')
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

//APPLICATION ROUTE
router.get('/applications',authenticated,async (req,res) =>{
    try{
        const application = await apply.find()
        res.render('application',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})
router.get('/applications/:id',authenticated,async (req,res) =>{
    try{
        const application = await apply.findById(req.params.id)
        res.render('showApplication',{ layout: 'admin',app:application })
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})
router.delete('/applications/delete/:id',authenticated,async (req,res) =>{
    try{
        await apply.findByIdAndDelete(req.params.id)
        res.redirect('/admin/applications')
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

//QUERY ROUTE
router.get('/queries',authenticated,async (req,res) =>{
    try{
        const queries = await query.find()
        res.render('queries',{layout: 'admin',query:queries})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})
router.get('/queries/:id',authenticated,async (req,res) =>{
    try{
        const queries = await query.findById(req.params.id)
        res.render('showQuery',{layout: 'admin',query:queries})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.delete('/queries/delete/:id',authenticated,async (req,res) =>{
    try{
        await query.findByIdAndDelete(req.params.id)
        res.redirect('/admin/queries')
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})


//COURSE ROUTE

router.get('/courses',authenticated,async (req,res) =>{
    try{
        const courses = await course.find()
        res.render('courses',{layout: 'admin',course:courses})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.get('/courses/new',authenticated,async (req,res) =>{
    try{
        res.render('addCourse',{layout: 'admin'})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})


router.post('/courses/new',authenticated,async (req,res) =>{
    try{
        const {courseName,overview,vision,mission,elegibility,features,faq} = req.body
        const newCourse = await new course({
            courseName,
            overview,
            vision,
            mission,
            elegibility,
            features,
            faq
        })
        await newCourse.save()
        res.redirect('/admin/courses')

    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.get('/courses/faqs/:id',authenticated,(req,res) =>{
    try{
        res.render('faq',{layout:'admin',id:req.params.id})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.post('/courses/faqs/:id',authenticated,async(req,res) =>{
    try{

        await course.findOneAndUpdate({_id: req.params.id}, {$push: {faq: {question: req.body.question, answer: req.body.answer}}})
        res.redirect('/admin/courses')
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.get('/courses/curriculum/:id',authenticated,(req,res) =>{
    try{
        res.render('curriculum',{layout:'admin',id:req.params.id})
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.post('/courses/curriculum/:id',authenticated,async(req,res) =>{
    try{
        
        await course.findOneAndUpdate({_id: req.params.id}, {$push: {curriculum: {title:{title1: req.body.title1, title2: req.body.title2 , title3:req.body.title3},subjects:{courseCode:req.body.courseCode,subjectName:req.body.subjectName,credits:req.body.credits}}}})
        
        res.redirect('/admin/courses')
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.get('/courses/edit/:id',authenticated,async (req,res)=>{
    const courses = await course.findById(req.params.id)
    res.render('editCourses',{layout:"admin",course:courses})
})

router.put('/courses/edit/:id',async (req,res)=>{
    
    req.blog = await course.findById(req.params.id)
    let blog = req.blog
    blog.courseName = req.body.courseName
    blog.overview = req.body.overview
    blog.vision = req.body.vision
    blog.mission = req.body.mission
    blog.elegibility = req.body.elegibility
    blog.features = req.body.features

    await blog.save()
    res.redirect('/admin/courses')
})

//LOGIN PAGE
router.get('/login',(req,res)=>{
    try{
        res.render("login")
    }catch{
        res.status(401).json({success:false})
        console.log(err);
    }
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/admin',
        failureRedirect:'/admin/login',
        failureFlash:true
    })(req,res,next)
})


router.get('/register',(req,res)=>{
    try{
        res.render("register")
    }catch{
        console.log(err);
    }
})

router.post('/register',async (req,res) =>{
   const {name, email, password, confirm} = req.body
   console.log(name);
    
   //ERRORS
   let errors = []

   if(!name || !email || !password || !confirm){
       errors.push({msg:'please fill all the fields'})
   }

   if(password.length < 6){
       errors.push({msg:'Password should not be less than 6 characters'})
   }
   if(confirm === ''){
       errors.push({msg:'Confirm Password not entered'})
   }
   else if(password !== confirm){
       errors.push({msg:'Password mismatch'})
   }

   if(errors.length > 0){
       res.render('register',{
           errors,
           name,
           email,
           password,
           confirm
       })
   }
   else{
       user.findOne({email :email})
       .then(User =>{
           if(User){
               errors.push({msg:'Email already exists'})
               res.render('register',{
                errors,
                name,
                email,
                password,
                confirm
            })

           }
           else{
               const newUser = new user({
                   name,
                   email,
                   password
               })
               bcrypt.genSalt(10, (err,salt) =>{
                   bcrypt.hash(newUser.password , salt, (err, hash)=>{
                       if(err) throw err

                       newUser.password = hash
                       newUser.save()
                       .then(user =>{
                        //    req.flash('success_msg','Account created successfully!')
                           res.redirect('/admin/login')
                       })
                       .catch(err =>{
                            console.log(err);
                       })
                   })
               })
           }
       })
   }
})

module.exports = router