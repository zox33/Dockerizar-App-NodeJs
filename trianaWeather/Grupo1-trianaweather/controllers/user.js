'use strict'

const bcrypt    = require('bcryptjs');
const passport  = require('passport');
const jwt       = require('jsonwebtoken');
const error_types = require('./error_types');
const User = require('../models/user');
const _                 = require('lodash');

let controller = {
    
    register: (req, res, next) => {
        User.find({username: req.body.username}, (err, result) => {
           if (result.length > 0) { 
                next(new error_types.Error400("el usuario ya existe"));
            } else {
                let hash = bcrypt.hashSync(req.body.password, parseInt(process.env.BCRYPT_ROUNDS));
                let user = new User({
                    email: req.body.email,
                    username: req.body.username,
                    fullname: req.body.fullname,
                    role: 'USER',
                    password: hash
                });

                user.save((err, user) => {
                    if (err) next(new error_types.Error400(err.message));
                    res.status(201).json(user);
                });
            }
        })
    },
    upgrade: (req, res, next) => {
        // ID del usuario a modificar.
        const user_id = req.params.id
        User.findByIdAndUpdate(user_id, { $addToSet : { role: "USER" }}, {new: true}, (err, user) => {
            if (err) next(new error_types.Error500(err.message));
            if (user == null) 
                next(new error_types.Error404("No se ha encontrado ningún usuario con ese ID"))
            else
                res.status(200).json(user);
        });
    },
    
    login: (req, res, next) => {
        passport.authenticate("local", {session: false}, (error, user) => {
            if (error || !user) {
                next(new error_types.Error404("Usuario o contraseña incorrecta"))
            } else {
                const payload = {
                    sub: user.id,
                    exp: Date.now() + parseInt(process.env.JWT_LIFETIME),
                    username: user.username
                };
                const token = jwt.sign(JSON.stringify(payload), process.env.JWT_SECRET, {algorithm: process.env.JWT_ALGORITHM});
                res.json({ 
                    username: user.username,
                    role: user.role,
                    token: token
                });

            }
        })(req, res)
    },
    
    users: (req, res, next)=>{
            User.find((err, users)=> {
            if (err) return console.error(err);
            res.status(200).json(users);
        });
    }
}

module.exports = controller;