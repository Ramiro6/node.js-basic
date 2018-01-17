'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema


const medicosSchema = new Schema({
    nombre: {type: String, require: [true, 'el nombre es necesario']},
    img: {type: String, required: false},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'},
    hospital: {type: Schema.Types.ObjectId, ref: 'Hospital'}
})


module.exports = mongoose.model('Medico', medicosSchema)