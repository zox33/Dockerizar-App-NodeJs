'use strict'

const error_types = require('./error_types');
const _ = require('lodash');

const DatoMeteorologico = require('../models/datos');
const Estacion = require('../models/estacion')
const User = require('../models/user')
const moment = require('moment')

module.exports = {

    nuevoDatoMeteorologico: async (req, res) => {
        let datoMeteorologico = new DatoMeteorologico({
            lluvia: req.body.lluvia,
            velocidadViento: req.body.velocidadViento,
            direccion: req.body.direccion,
            temperatura: req.body.temperatura,
            humedad: req.body.humedad,
            calidadAire: req.body.calidadAire,
            presion: req.body.presion,
            id_Estacion: req.params.id,
            date: new Date(Date.now())
        });

        datoMeteorologico.save()
            .then(dt => dt.populate('id_Estacion').execPopulate())
            .then(dt => dt.populate({
                path: 'id_Estacion',
                model: Estacion,
                populate: {
                    path: 'usuarioRegistra',
                    model: User,
                    select: 'fullname email'
                }
            }).execPopulate())
            .then(dt => dt.populate({
                path: 'id_Estacion',
                model: Estacion,
                populate: {
                    path: 'usuarioMantiene',
                    model: User,
                    select: 'fullname email'
                }
            }).execPopulate())
            .then(dt => res.status(201).json(dt))
            .catch(err => res.send(500, err.message));
    },

    getById: async (req, res) => {
        DatoMeteorologico.findOne({ _id: req.params.id }, (err, data) => {
            if (err) res.send(500, err.message);
            User.populate(data, { path: "usuarioRegistra", select: ['fullname', 'email'] }, (err, data) => {
                if (err) res.send(500, err.message);
                User.populate(data, { path: "usuarioMantiene", select: ['fullname', 'email'] }, (err, data) => {
                    if (err) res.send(500, err.message)
                    Estacion.populate(data, { path: "id_Estacion" }, (err, data) => {
                        if (err) res.send(500, err.message)
                        res.status(200).json(data);
                    })
                })
            })
        })
    },

    getOne: async (req, res) => {
        DatoMeteorologico.find({id_Estacion: req.params.id}).populate({
            path: 'id_estacion', populate: [{
                path: 'usuarioRegistra',
                select: [
                    'fullname', 'email'
                ]
            }, {
                path: 'usuarioMantiene',
                select: [
                    'fullname', 'email'
                ]
            }]
        })
            .then(e => res.status(200).json(e))
            .catch(err => res.status(500).send(err.message))
    },

    datosPorFechaUnaEstacion: (req, res) => {

        var from = req.params.from.split('-')
        var to = req.params.to.split('-')
    
        const dateFrom = new Date(parseInt(from[2]),parseInt(from[1])-1,parseInt(from[0]));
        const dateTo = new Date(parseInt(to[2]),parseInt(to[1])-1,parseInt(to[0]));
        DatoMeteorologico.find({id_Estacion:req.params.id,date:{$gte:dateFrom,$lte:dateTo}})
        .populate({path:'id_Estacion', populate:[ {path: 'usuarioRegistra',
        select: [
            'fullname', 'email'
        ]},{path: 'usuarioMantiene',
        select: [
            'fullname', 'email'
        ]}]})
        .exec()
        .then(e => {res.status(200).json(e)})
        .catch(err => res.status(500).send("No d autorización"))
    
        
    },
    datosPorFecha: (req,res) =>{
        
        var from = req.params.from.split('-')
        var to = req.params.to.split('-')
    
        const dateFrom = new Date(parseInt(from[2]),parseInt(from[1])-1,parseInt(from[0]));
        const dateTo = new Date(parseInt(to[2]),parseInt(to[1])-1,parseInt(to[0]));

        DatoMeteorologico.find({date:{$gte:dateFrom,$lte:dateTo}})
        .populate({path:'id_Estacion',
        populate:[ 
        {path: 'usuarioRegistra',
        select: [
            'fullname', 'email']},
        {path: 'usuarioMantiene',
        select: [
            'fullname', 'email'
        ]}
        ]})
        .exec()
        .then(e => res.status(200).json(e))
        .catch(err => res.status(500).send("No tiénes autorización"))
    
        
    },
   getTodosToday: async (req, res) => {
        try {
            const today = moment().startOf('day')
            let datos=DatoMeteorologico.find({
            createdAt: {
            $gte: today.toDate(),
            $lte: JSON.stringify(moment(today).endOf('day').toDate())
         }
        });
        res.send(200,datos);
        } catch (error) {
            res.send(500, error.message);
        }

} 
} 