require('dotenv').config()
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
const connect = require('./../db/connect');
const registrationSchema = require('./../models/registration');
var cors = require('cors');

//auth imports
import session from 'express-session';
import bcryp  from 'bcrypt';
const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
import flash from 'connect-flash';



//routes
import index from './../routes/r_index';
import admin from './../routes/r_admin';


const app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cors())

//seting up views directory and engine
app.use(session({
    secret: 'asdasfsdaf',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//login auth
passport.use(new LocalStrategy(
    //username and password are from forms
    function(username, password, done) {

        var User = mongoose.model('Users', registrationSchema);
        //finding if username exist
        User.find({Username: username})

            .catch(function(err) {
                throw(err);
            })
            .then(function(user) {
                console.log(user);
                //checking if array in not empty
                if(user.length > 0) {

                    const hash = user[0].Password;
                    //comapring hashed password with inputed one
                    bcryp.compare(password, hash, function(err, response) {

                        //if auth is true
                        if(response) {
                            console.log('succes');
                            return done(null, {user_id: user[0]._id});
                            //if false
                        } else {
                            console.log('failure');

                            return done(null, false, {message: "password doesnt match"});
                        }
                    });

                    //checking if user exist
                } else {

                    return done(null, false, {message: "invalid username"});

                }
            });
    }
));

//url
app.use('/', index);

app.use('/admin', admin);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});