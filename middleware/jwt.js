'use strict'
const jwt = require('jsonwebtoken')
const config = require('../config')

const newToken = (x) => {
    return jwt.sign({usuario: x}, config.token, { expiresIn: 14400 })
}

const decode = (x) => {
    const y = jwt.decode(x)
    return y.usuario
}




module.exports = {
    newToken,
    decode
}