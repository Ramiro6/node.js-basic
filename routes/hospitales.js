'use strict'
const apidb = require('../api-db/hospitales')
const print = require('../print/print')
const jwt = require('../middleware/jwt')



const all = async (req, res) => {
    try {
        const q = await apidb.findall()
        res.send(q)
    } catch (e) {
        print.print('error en' + e)
        res.send({e})
    }
}


const takeToken = async (data) => {
    const token = jwt.decode(data.split(" ")[1])
    try {
        const data = await apidb.findEmail(token)
        // console.log(data._id);
        return data._id
    } catch (e) {
        console.error(e);
    }
}


const create = async (req, res) => {
    const { nombre, img, usuario } = req.body
    const q = { 
        nombre, 
        img, 
        usuario: await takeToken(req.headers.authorization)  
    }
    try {
        const saveName = await apidb.create(q)
        print.print('its create')
        res.status(201).send(saveName)
    } catch (e) {
        res.status(404).send({message: e})
    }
}

const updateUser = async (req, res) => {
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

const deleteHospiatl = async (req, res) => {
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
    updateUser,
    deleteHospiatl
}