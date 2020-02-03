'use strict'
const User = require('../models/user');
const bcrypt    = require('bcryptjs');

let usuarios = {
    cargarUsuarios(){

        const admin = new User({
            fullname: "admin",
            email: "admin@admin",
            username: "admin",
            role: "ADMIN",
            password: bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS)),
            EstacionesRegistros:[],
            EstacionesMantenimiento:[]
        });

        const usuario = new User({
            fullname: "usuario",
            email: "usuario@usuario",
            username: "usuario",
            role: "USER",
            password: bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS)),
            EstacionesRegistros:[],
            EstacionesMantenimiento:[]
        });

        const manager = new User({
            fullname: "manager",
            email: "manager@manager",
            username: "manager",
            role: "MANAGER",
            password: bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS)),
            EstacionesRegistros:[],
            EstacionesMantenimiento:[]
        });
        
        User.find({username: admin.username}, (err, usuarios) => {
            if (usuarios.length > 0) { 
                console.log("Admin creado")
            }else{
                 admin.save()
                 .then(() => console.log('Admin creado'));
             }
         });

         User.find({username: usuario.username}, (err, usuarios) => {
            if (usuarios.length > 0) { 
                console.log("usuario creado")
            }else{
                usuario.save()
                 .then(() => console.log('Usuario creado'));
             }
         });

         User.find({username: usuario.username}, (err, usuarios) => {
            if (usuarios.length > 0) { 
                console.log("Manager creado")
            }else{
                manager.save()
                 .then(() => console.log('Manager creado'));
             }
         });
    },
}
module.exports = usuarios;