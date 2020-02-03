'use strict'
const DatoMeteorologico = require('../models/datos');

let datos = {
    cargarDatos() {

        const dato1 = new DatoMeteorologico({
            lluvia: 1,
            velocidadViento: 1,
            direccion: 1,
            temperatura: 1,
            humedad: 1,
            calidadAire: 1,
            presion: 1,
            date: new Date(Date.now()),
            id_Estacion: "5dfb5cf477df351504f48612"
        });

        DatoMeteorologico.find({ _id: dato1.ObjectId }, (err, datos) => {
            if (datos.length > 0) {
                console.log("Datos meteorologicos creado")
            } else {
                dato1.save()
                    .then(() => console.log('Datos meteorologicos creado'));
            }
        });
    },
}
module.exports = datos; 