const express = require('express');
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://juni_admin:admin_juni@ds157964.mlab.com:57964/junior', {
    useMongoClient: true,

});

module.exports = connect;