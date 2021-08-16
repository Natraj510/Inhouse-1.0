module.exports = {
    authenticated : (req,res,next) =>{
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg','Please Login to enter!')
        res.redirect('/admin/login')
    }
}