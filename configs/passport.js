const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const user = require('../models/users')

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField:'email'},(email,password,done)=>{
            user.findOne({email:email})
            .then(User =>{
                if(!User){
                    return done(null, false, {message:'Email does not exist'})
                }

                bcrypt.compare(password, User.password, (err, isMatch) =>{
                    if(err) throw err

                    if(isMatch){
                        return done(null ,User)
                    }else{
                        return done(null,false,{message:'Incorrect password'})
                    }
                })
            })
            .catch(err => console.log(err))
        })
    )
    passport.serializeUser((user, done)=> {
        done(null, user.id);
      });
      
      passport.deserializeUser((id, done) =>{
        user.findById(id, function(err, user) {
          done(err, user);
        });
      });
}