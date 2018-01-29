'use strcit'
const apiHospi = require('../api-db/hospitales')
const apiUser = require('../api-db/usuario')
const apiMedic = require('../api-db/medicos')
const fs = require('fs')


const imagenes = (req, res) => {
    const { tipo, img } = req.params
    const x = {tipo, img}
    let path = `./upload/${x.tipo}/${x.img}`
    fs.exists(path, (exite) => {
        if(!exite) {
            path = './assets/no-img.jpg';
        }
        res.sendfile(path)
    })
    // res.send({x})
}


module.exports = {
    imagenes
}