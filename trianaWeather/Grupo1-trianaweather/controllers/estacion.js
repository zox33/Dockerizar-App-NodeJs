'use strict'


const _ = require('lodash');

const Estacion = require('../models/estacion');

module.exports = {

    getAll: (req,res) =>{
        Estacion.find()
        .populate('usuarioRegistra',{'fullname':1,'email':1})
        .populate('usuarioMantiene',{'fullname':1,'email':1}).exec()
        .then(e => res.status(200).json(e))
        .catch(err => res.status(500).send("No tiénes autorización"))

       
    

    },

    getById: (req,res)=>{
        Estacion.findById(req.params.id)
        .populate({path:'usuarioRegistra',select:['fullname','email']})
        .populate({path:'usuarioMantiene',select:['fullname','email']}).exec()
        .then(e => res.status(200).json(e))
        .catch(err => res.status(500).send("No tienes autorización"))
    },

    nuevaEstacion: (req,res) => {

        let estacion = new Estacion({
            id: req.body.id,
            localizacion: req.body.localizacion,
            nombre: req.body.nombre,
            usuarioRegistra: req.user._id,
            usuarioMantiene: req.body.usuarioMantiene
        });

        estacion.save()
        .then(e => e.populate({path:'usuarioRegistra',select:['fullname','email']}).execPopulate())
        .then(e => e.populate({path:'usuarioMantiene',select:['fullname','email']}).execPopulate())
        .then(e => res.status(201).json(e))
        .catch(err => res.status(500).send("No tiénes autorización"))
    },
      
   updateEstacion: (req, res, next) => {
    
    const nuevos_datos = req.params.id
    Estacion.findByIdAndUpdate(nuevos_datos,req.body, {new: true}, (err, estacionp) => {
        if (err) next(new error_types.Error500(err.message));
        if (estacionp == null) 
            next(new error_types.Error404("No se ha encontrado ninguna estación con ese ID"))
        else
            res.status(200).json(estacionp);
    }); 
    },

    deleteEstacion: (req,res,next) =>{
    const idestacion= req.params.id
    Estacion.findByIdAndRemove(idestacion, (err, estacionp) => {
    if (err) return res.status(500).send(err);
    const response = {
        message: "Estacion borrada",
        id: estacionp._id
    };
    return res.status(200).send(response);
    });
    }

   
}
