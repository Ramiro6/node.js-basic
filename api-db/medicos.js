'use strict'
const model = require('../models/medicos')
const modelUsuario = require('../models/usuario')
const modelHospital = require('../models/hospital')


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
        return modelUsuario.findOne({_id: e})
    },

    findId: (e) => {
        return modelHospital.findById({_id: e})
    },

    count: () => {
        return model.count({})
    },

    updateImage: (e, update) => {
        return model.findByIdAndUpdate({_id: e}, {img: update}, {new: true})
    },

}