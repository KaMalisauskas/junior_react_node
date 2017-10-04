'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _connectFlash = require('connect-flash');

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _r_index = require('./../routes/r_index');

var _r_index2 = _interopRequireDefault(_r_index);

var _r_admin = require('./../routes/r_admin');

var _r_admin2 = _interopRequireDefault(_r_admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var connect = require('./../db/connect');
var registrationSchema = require('./../models/registration');
var cors = require('cors');

//auth imports

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//routes


var app = (0, _express2.default)();

app.use(_bodyParser2.default.urlencoded());
app.use(_bodyParser2.default.json());
app.use((0, _expressValidator2.default)());
app.use(cors());

//seting up views directory and engine
app.use(_express2.default.static(__dirname + '/../assets'));
app.set('views', _path2.default.join(__dirname, '../react-junior/public'));
app.set('view engine', 'ejs');
app.use((0, _expressSession2.default)({
    secret: 'asdasfsdaf',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use((0, _connectFlash2.default)());

//login auth
passport.use(new LocalStrategy(
//username and password are from forms
function (username, password, done) {

    var User = _mongoose2.default.model('Users', registrationSchema);
    //finding if username exist
    User.find({ Username: username }).catch(function (err) {
        throw err;
    }).then(function (user) {
        console.log(user);
        //checking if array in not empty
        if (user.length > 0) {

            var hash = user[0].Password;
            //comapring hashed password with inputed one
            _bcrypt2.default.compare(password, hash, function (err, response) {

                //if auth is true
                if (response) {
                    console.log('succes');
                    return done(null, { user_id: user[0]._id });
                    //if false
                } else {
                    console.log('failure');

                    return done(null, false, { message: "password doesnt match" });
                }
            });

            //checking if user exist
        } else {

            return done(null, false, { message: "invalid username" });
        }
    });
}));

//url
app.use('/', _r_index2.default);

app.use('/admin', _r_admin2.default);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('listening on port ' + PORT);
});