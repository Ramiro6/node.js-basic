'use strict'
const model = require('../models/usuario')


module.exports = {
    findEmail: (e) => {
        return model.findOne({email: e})
    }
}