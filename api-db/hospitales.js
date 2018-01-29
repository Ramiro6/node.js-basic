'use strict'
const model = require('../models/hospital')
const modelUsuario = require('../models/usuario')


module.exports = {
    findall: () => {
        return model.find({})
    },

    findNombre: (e) => {
        return model.find({nombre: e})
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
    },

    findEmail: (e) => {
        return modelUsuario.findOne({email: e})
    },

    count: () => {
        return model.count({})
    },

    updateImage: (e, update) => {
        return model.findByIdAndUpdate({_id: e}, {img: update}, {new: true})
    },

    findById: (e) => {
        return model.findById({_id: e})
    }
}