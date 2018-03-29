'use strict';
const mongoose = require('mongoose');
const schoolSchema = new mongoose.Schema({
        isActive: Boolean,
        name: String,
        location: String,
        mac: String,
        ip: String,
        wifiUsername: String,
        wifiPassword: String,
        gatewayUsername: String,
        gatewayPassword: String,
        latitude: String,
        longitude: String,
        startDate: String,
        endDate: String,
        createdOn: String,
        createdBy: String,
        modifiedOn: String,
        modifiedBy: String
    },
    {
        minimize: false,
        versionKey: false,
    });

module.exports = {
    'model': mongoose.model('Gateway', schoolSchema)
}
