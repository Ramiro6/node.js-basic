'use strict'
const express = require('express')
const print = require('./print/print')
const mongoose = require('mongoose')
const config = require('./config')
const routes = require('./routes/app')
const body = require('body-parser')
const fileUpload = require('express-fileupload');

const app = express()

const port = process.env.PORT || 3000

app.use(body.urlencoded({ extended: false }))
app.use(body.json())
app.use(fileUpload());
app.use('/api', routes)

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