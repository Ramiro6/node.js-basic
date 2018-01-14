'use strict'
const apidb = require('../api-db/usuario')
const print = require('../print/print')
const bcrypt = require('bcryptjs')

const all = async (req, res) => {
    // res.status(200).json({message: 'todo bien'})
    try {
        const x = await apidb.findall()
        res.status(200).send(x)
        print.print('send data')
    } catch(e) {
        res.status(500).send({message: e})
    }
}

const create = async (req, res) => {
    const { nombre, email, password, img, role } = req.body
    const q = { nombre, email, 
        password:bcrypt.hashSync(password, 10),
        img, role }
    try {
        const saveUser = await apidb.create(q)
        print.print('its create new user')
        res.status(201).send({saveUser})
    } catch (e) {
        print.print(`sadjkasjkdkj  ${e}`)
        res.status(404).send(e)        
    }
}

const updateUser = async (req, res) => {
    const id = req.params.id
    const { nombre, email, role } = req.body
    const post = { nombre, email, role }
    try {
        let updateEntrance = await apidb.update(id, post)
        print.print('update content')
        res.send({updateEntrance})
    } catch (e) {
        if(!e) return res.status(500).send({e})
    }
}

const deleteEntrance = async (req, res) => {
    const id = req.params.id
    try {
        let updateEntrance = await apidb.delete(id)
        print.print('delete content')
        res.send({message: 'deleteeee'})
    } catch (e) {
        if(!e) return res.status(500).send({e})
    }
}


module.exports = {
    all,
    create,
    updateUser,
    deleteEntrance
}