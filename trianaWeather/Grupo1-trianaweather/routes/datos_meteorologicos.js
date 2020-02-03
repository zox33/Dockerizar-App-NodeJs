'use strict'

const express = require('express')
const router = express.Router()
const middleware = require('../middleware/index');
const DatosController = require('../controllers/datos_meteorologicos')

router.get('/today',middleware.ensureAuthenticated,DatosController.getTodosToday);
router.get('/from/:from/to/:to', middleware.ensureAuthenticated,DatosController.datosPorFecha);
router.post('/', middleware.ensureAuthenticatedManager, DatosController.nuevoDatoMeteorologico);
router.get('/:id', middleware.ensureAuthenticated, DatosController.getById);

module.exports = router