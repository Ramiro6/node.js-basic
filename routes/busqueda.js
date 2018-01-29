'use strict'
const apidbHospital = require('../api-db/hospitales')
const apidbMedico = require('../api-db/medicos')

const busqueda = async (req, res) => {
    let busqueda = req.params.busqueda
    let regex = new RegExp(busqueda, 'i')
    try {
        const hospitalBusqueda = await apidbHospital.findNombre(regex)
        const medicoBusqueda = await apidbMedico.findNombre(regex)
        res.send({message: 'data', hospitalBusqueda, medicoBusqueda}) 
    } catch (e) {
        
    }
}

const tabla = async (req, res) => {
    let busqueda = req.params.busqueda
    let regex = new RegExp(busqueda, 'i')

    let tabla = req.params.tabla
    try {
        switch (tabla) {
            case 'medico':
             const medicoBusqueda = await apidbMedico.findNombre(regex)
             res.send({medicoBusqueda})
                break;
            case 'hospital':
             const hospitalBusqueda = await apidbHospital.findNombre(regex)
             res.send({hospitalBusqueda })
                break;
        
            default:
            return res.status(400).send({ message: 'no have items'})
                break;
        }
        
    } catch (e) {
        console.error(e);
    }
}






module.exports = {
    busqueda,
    tabla
}