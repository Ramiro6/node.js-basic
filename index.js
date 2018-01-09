'use strict'
const express = require('express')
const print = require('./print/print')
const mongoose = require('mongoose')
const config = require('./config')

const app = express()

const port = process.env.PORT || 3000



app.get('/', (req, res) => {
    res.status(200).json({message: 'todo bien'})
})

async function start() {
    mongoose.Promise = global.Promise;
    await mongoose.connection.openUri(config.database, (err, res) => {
        if(err) throw err
        print.print('DATABASE ON')
    })

    app.listen(port, () => {
        print.print(`Server on ${port}`)
    })
}

start()