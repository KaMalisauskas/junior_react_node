const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
//hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.index = function(req, res) {
    var sessData = req.session;
    res.render('index', {title: 'Index'} );
};