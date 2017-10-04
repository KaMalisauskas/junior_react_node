const express = require('express');
const mongoose = require('mongoose');
const connect = require('./../db/connect');
const passport = require('passport');
const registrationSchema = require('./../models/registration');
//hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

//auth
exports.auth = passport.authenticate('local', {
    successRedirect: '/admin/main',
    failureRedirect: '/admin',
    failureFlash: true
});


exports.login_page = function(req, res) {
    res.render('aLogin', {title: 'Login', errors: req.session.errors, message: req.flash('error')} );
    req.session.destroy();
};


exports.register = function(req, res) {
    res.render('registration', {title: 'Registration', errors: req.session.errors} );
    req.session.destroy();
};


exports.main = function(req, res) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render('aMain', {title: 'Admin main', username: req.session.username});
};


exports.registration = function(req, res) {

    var User = mongoose.model('Users', registrationSchema);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const rePassword = req.body.rePassword;



    //validation
    req.checkBody('username', 'Required username').notEmpty();
    req.checkBody('email', 'Required  email').notEmpty();
    req.checkBody('email', 'Not an email').isEmail();
    req.checkBody('password', 'Required  password').notEmpty();
    req.checkBody('rePassword', 'Required match').notEmpty();
    req.checkBody('rePassword', 'Password does not match').equals(password);

    //escaping string
    req.sanitizeBody('username').escape();
    req.sanitizeBody('email').escape();
    req.sanitizeBody('password').escape();

    let errors = req.validationErrors();

    if (!errors) {

        bcrypt.hash(password, saltRounds, function(err, hash) {
            // Store hash in your password DB.
            let newUser = new User({
                Username: username,
                Email: email,
                Password: hash,
            });


            newUser.save(function(err) {
                if(err) {
                    throw err;
                } else {
                    console.log("Person saved");

                    const userId = newUser.id;

                    //req.login(newUser.id, function(err) {
                        res.redirect('/admin/register');
                    //};


                };
            });

        });

    } else {

        var sessData = req.session;

        req.session.errors = errors;

        sessData.success = false;

        res.redirect('/admin/register');
    }
};

exports.logout = function(req, res) {
    req.logOut();
    req.session.destroy();
    res.redirect('/');
};