'use strict'
const model = require('../models/usuario')


module.exports = {
    findall: () => {
        return model.find({})
    },

    create: (e) => {
        let newUser = new model(e)
        return newUser.save()
    },

    update: (e, update) => {
        return model.findByIdAndUpdate({_id: e}, update, {new: true})
    },

    delete: (e) => {
        return model.findByIdAndRemove({_id: e})
    }
}