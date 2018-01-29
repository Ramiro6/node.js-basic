'use strict'
const apidb = require('../api-db/medicos')
const apidbUser = require('../api-db/hospitales')
const print = require('../print/print')
const jwt = require('../middleware/jwt')

const all = async (req, res) => {
    let desde = req.query.desde || 0
    desde = Number(desde)
    try {
        const q = await apidb.findall().skip(desde).limit(2)
        const countAll = await apidb.count()
        res.send({q, countAll})
    } catch (e) {
        print.print('error en' + e)
        res.send({e})
    }
}


const takeToken = async (data) => {
    const token = jwt.decode(data.split(" ")[1])
    try {
        const data = await apidbUser.findEmail(token)
        return data
    } catch (e) {
        console.error(e);
    }
}


const create = async (req, res) => {
    const { nombre, img, usuario, hospital } = req.body
    const q = { 
        nombre, 
        img, 
        usuario: await takeToken(req.headers.authorization),
        hospital: await apidb.findId(hospital)
    }
    try {
        const saveName = await apidb.create(q)
        print.print('its create')
        res.status(201).send(saveName)
    } catch (e) {
        res.status(404).send({message: e})
    }
}

const updateMedico = async (req, res) => {
    const id = req.params
    const { nombre, img } = req.body
    const q = { nombre, img }
    try {
        const updateItem = await apidb.update(id.id, q)
        res.status(201).send({updateItem})
        
    } catch (e) {
        console.error(e);
    }
}

const deleteMedico = async (req, res) => {
    const id = req.params
    try {
        const deleleHospital = await apidb.delete(id.id)
        res.send({ message: 'se borro' + deleleHospital})
    } catch (e) {
        console.error(e);
    }
}




module.exports = {
    all,
    create,
    updateMedico,
    deleteMedico
}