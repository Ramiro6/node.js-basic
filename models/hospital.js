'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hospitalShema = new Schema ({
    nombre: {type: String, require: [true, 'el nombre es necesario']},
    img: {type: String, required: false},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
})


module.exports = mongoose.model('Hospital', hospitalShema)