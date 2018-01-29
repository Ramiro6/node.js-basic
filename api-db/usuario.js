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