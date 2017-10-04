const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

//requesting controllers
const indexController = require('./../controllers/c_index');

const router = express.Router();

//get
router.get('/', indexController.index);

module.exports = router;