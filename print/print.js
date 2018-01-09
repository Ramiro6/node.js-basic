'use strict'
const chalk = require('chalk')


module.exports = {
    print(valor) {
        console.log(chalk.green('[Connect]'), chalk.blue(valor));
    }
}