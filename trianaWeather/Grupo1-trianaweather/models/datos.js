'use strict'

const mongoose = require('mongoose')

const datosSchema = new mongoose.Schema({
    lluvia: Number,
    velocidadViento: Number,
    direccion: Number,
    temperatura: Number,
    humedad: Number,
    calidadAire: Number,
    presion: Number,
    date: {type:Date, default: Date.now()},
    id_Estacion: [{type: mongoose.Schema.Types.ObjectId, ref:'Estacion'}]
});

module.exports = mongoose.model('Datos', datosSchema);