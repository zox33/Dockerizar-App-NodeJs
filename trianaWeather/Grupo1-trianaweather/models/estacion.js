'use strict'
const mongoose = require('mongoose');


const estacionSchema = new mongoose.Schema({
    id: Number,
    localizacion: String,
    nombre: String,
    usuarioRegistra: {type: mongoose.Schema.ObjectId, ref:'User'},
    usuarioMantiene: {type:mongoose.Schema.ObjectId, ref:'User'}

});

module.exports =  mongoose.model('Estacion', estacionSchema);