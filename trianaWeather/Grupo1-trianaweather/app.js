'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const usuario_rutas = require('./routes/users');
const estacion_rutas = require('./routes/estacion')
const datos_rutas = require('./routes/datos_meteorologicos')
const middleware = require('./middleware/index'); 
const User = require('./models/user');
const usuarioService = require('./services/usuario');
const datosService = require('./services/datos_meteorologicos')

require('dotenv').config();

const mongoose = require('mongoose');

/*
   CONECTAR CON MONGO
*/
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Conectado!');
});
usuarioService.cargarUsuarios();
datosService.cargarDatos();
passport.use(new LocalStrategy((username, password, done) => {
    let busqueda = (username.includes('@')) ? { email: username } : { username: username };
    //let data = UserService.findUser(busqueda);
    User.findOne(busqueda, (err, user) => {
        if (err) return done(null, false);
        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    });


}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload.username)
    User.findOne({'username':jwt_payload.username}, (err, user) => {
        if (err) return done(null, false);
        else return done(null, user);
    });
}));

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/', usuario_rutas);
app.use('/api/stations/', estacion_rutas);
app.use('/api/weather/',datos_rutas);
app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);

module.exports = app
