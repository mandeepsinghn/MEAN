'use strict';
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
        username: String,
        password: String,
        isActive: Boolean,
        userInfo: {type: mongoose.Schema.ObjectId, ref: 'UserInfo'}
    },
    {
        minimize: false,
        versionKey: false,
    });

module.exports = {
    'model': mongoose.model('User', userSchema)
}
