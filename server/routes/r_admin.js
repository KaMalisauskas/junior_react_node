const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const registrationSchema = require('./../models/registration');
//requesting controllers
const adminController = require('./../controllers/c_admin');

const router = express.Router();

//get
router.get('/', adminController.login_page);


//admin get
router.get('/main', authenticationMiddleware(), adminController.main);
router.get('/register',authenticationMiddleware(), adminController.register);
router.get('/logout', authenticationMiddleware(), adminController.logout);

//post
router.post('/register/registration', adminController.registration);
router.post('/', adminController.auth);


//auth and not auth users
passport.serializeUser(function(userId, done) {
    done(null, userId);
});

passport.deserializeUser(function(userId, done) {
    done(null, userId);
});


//accesing routes only with auth users
function authenticationMiddleware() {
    return (req, res, next) => {
        console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        var User = mongoose.model('Users', registrationSchema);

        //checking if is Auth
        if (req.isAuthenticated()) {

            //fetching user data to send to the router
            User.find({_id:req.session.passport.user.user_id}, function(err, user) {
                if(err) throw err;
                req.session.username = user;
                return next();
            });
        //if not auth
        } else {
            res.redirect('/admin');
        }
    };
};

module.exports = router;