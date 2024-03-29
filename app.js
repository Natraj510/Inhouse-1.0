const express = require('express')
const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const passport = require('passport')
const app = express()
require('dotenv').config();
require('./configs/passport')(passport)

const PORT = process.env.PORT;

//.ENV

//MIDDLEWARES
app.use(expressLayouts);
app.set('views', './views')

app.set("layout admin", false);
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use(flash())
app.use(methodOverride('_method'))


//EXPRESS-SESSIONS
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());


//FLASH MIDDLEWARES
app.use((req,res,next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})


//ROUTES
app.use('/',require('./routes/static'))
app.use('/admin',require('./routes/admin'))

app.get('/logout',(req,res) =>{
    req.logout()
    res.redirect('/admin/login')
})



//MOGOOSE CONNECTION
mongoose.connect(process.env.myDb,{useNewUrlParser:true,useUnifiedTopology: true,useFindAndModify:false})
.then(()=> console.log('Database connected!'))
.catch((err)=>console.log(err))




app.listen(PORT,()=>{
    console.log("Server Connected!");
})