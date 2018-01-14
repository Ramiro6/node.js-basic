'use strict'
const apidb = require('../api-db/login')
const print = require('../print/print')
const bcrypt = require('bcryptjs')
const token = require('../middleware/jwt')

const comparatePassword = (userPass, dataPass) => {
    return bcrypt.compareSync(userPass,dataPass)
}


const login = async (req, res) => {
    const { email, password} = req.body
    const q = { email, password }
    try {
        const findEmail = await apidb.findEmail(q.email)
        if(!findEmail) return res.send({message: 'no encuentra este email'})
        if(!comparatePassword(q.password, findEmail.password)) return res.send({message: 'el password no es igual'})
        print.print('send data')
        const userToken = await token.newToken(q.email)
        res.send({userToken})
    } catch (e) {
        console.error(e);
    }
}


module.exports = {
    login
}