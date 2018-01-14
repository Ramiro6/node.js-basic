'use strict'
const express = require('express')
const app = express.Router()
const user = require('./usuario')
const login = require('./login')
const protect = require('express-jwt')
const config = require('../config')


app.get('/', user.all)
app.post('/', protect({secret: config.token }), user.create)
app.put('/:id', user.updateUser)
app.delete('/:id', user.deleteEntrance)


// login
app.post('/login', login.login)


module.exports = app