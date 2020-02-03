'use strict'

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {type:Number},
    fullname: {type:String},
    email: {type:String},
    username: {type:String},
    role: {type: String, enum: [
        "USER", "MANAGER", "ADMIN"
    ]},
    password: String,
    EstacionesRegistros:[ {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Estacion'}],
    EstacionesMantenimiento:[{type: mongoose.Schema.Types.ObjectId, 
        ref: 'Estacion'}]
});

module.exports = mongoose.model('User', userSchema);