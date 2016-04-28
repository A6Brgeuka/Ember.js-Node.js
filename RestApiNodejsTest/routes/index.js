var express = require('express');

module.exports = function(app){
  app.use('/api', require('./product'));
};