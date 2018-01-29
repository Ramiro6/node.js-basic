'use strict'
const express = require('express')
const app = express.Router()
const user = require('./usuario')
const hospital = require('./hospitales')
const medico = require('./medicos')
const busqueda = require('./busqueda')
const upload = require('./upload')
const login = require('./login')
const protect = require('express-jwt')
const config = require('../config')


app.get('/', user.all)
app.post('/', protect({secret: config.token }), user.create)
app.put('/:id', user.updateUser)
app.delete('/:id', user.deleteEntrance)


// login
app.post('/login', login.login)

// hospitales
app.get('/hospital', hospital.all)
app.post('/hospital', protect({secret: config.token }), hospital.create)
app.put('/hospital/:id', protect({secret: config.token }), hospital.updateUser)
app.delete('/hospital/:id', protect({secret: config.token }), hospital.deleteHospiatl)


// medico
app.get('/medicos', medico.all)
app.post('/medicos', protect({secret: config.token }), medico.create)
// app.put('/medicos/:id', protect({secret: config.token }), hospital.updateUser)
// app.delete('/medicos/:id', protect({secret: config.token }), hospital.deleteHospiatl)

// busqueda
app.get('/busqueda/todo/:busqueda', busqueda.busqueda)
app.get('/coleccion/:tabla/:busqueda', busqueda.tabla)

// upload
app.put('/upload/:tipo/:id', upload.upload)

module.exports = app