'use strict';

const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mean');

var loadModel=function (modelName) {
  return require('../database/models/'+ucfirst(modelName)+'Schema').model;
};

var ucfirst=function(str) {
    str += ''
    var f = str.charAt(0)
        .toUpperCase()
    return f + str.substr(1)
}

module.exports={
    'loadModel':loadModel
}