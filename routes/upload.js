'use strict'
const fileUpload = require('express-fileupload');
const apiHospi = require('../api-db/hospitales')
const apiUser = require('../api-db/usuario')
const apiMedic = require('../api-db/medicos')
const fs = require('fs')




const upload = (req, res) => {

    let tipo = req.params.tipo
    let id = req.params.id

    let tiposValidos = ['hospitales', 'medicos', 'usuario']

    if( tiposValidos.indexOf(tipo) < 0 ) {
        return res.status(400).send({message: 'extencion no valida'});
    }

  if (!req.files) return res.status(400).send({message: 'No files were uploaded.'});

  let sampleFile = req.files.imagen;
  let nombreCortado = sampleFile.name.split('.')
  let extencionArchivo = nombreCortado[nombreCortado.length - 1]

//   res.status(200).send({message: 'correcto', extencionArchivo})

  let extencionesValidas = ['png', 'jpg', 'gif', 'jpeg']
  

  if(extencionesValidas.indexOf(extencionArchivo) < 0 ) {
    return res.status(400).send({message: 'extencion no valida'});
  }


  let nombreDelArchivo = `${ id }-${new Date().getMilliseconds()}.${ extencionArchivo }`

  let path = `./upload/${ tipo }/${ nombreDelArchivo }`

  sampleFile.mv( path, err => {
      if(err) return res.status(500).send({message: 'error al mover archivo', err});
    //   res.status(200).send({message: 'correcto', extencionArchivo})

    subirPorTipo(tipo, id, nombreDelArchivo, res)

    // subirPorTipo(tipo, id, nombreDelArchivo, res).then((item) => {
    //     console.log(item);
    //     let pathViejo = './upload/usuario/' + item.img

    //     // console.log(pathViejo);


    //     if ( fs.existsSync(pathViejo)) {
    //         fs.unlink(pathViejo)
    //     }
    //     // res.send({message: 'imagen act', item})
    //     // console.log(item.img);
    // }).catch((e) => {
    //     console.error(e);
    // })
  })



//   // Use the mv() method to place the file somewhere on your server
//   sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
//     if (err)
//       return res.status(500).send(err);

//     res.send('File uploaded!');
//   });
}



const subirPorTipo = async (tipo, id, nombreDelArchivo, res) => {
    if(tipo === 'usuario') {
        try {
            console.log(nombreDelArchivo);

            const idViejo = await apiUser.findById(id)
            let pathViejo = './upload/usuario/' + idViejo.img

            if ( fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo)
            }

            const findByName = await apiUser.updateImage(id, nombreDelArchivo)

            res.send({message: 'imagen act', findByName})
        } catch (e) {
            console.error(e);
        }
    }

    if(tipo === 'medicos') {
        try {
            console.log(nombreDelArchivo);

            // const idViejo = await apiUser.findById(id)
            const idViejo = await apiMedic.findById(id)

            console.log(idViejo);

            let pathViejo = './upload/usuario/' + idViejo.img

            if ( fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo)
            }
            // const findByName = await apiUser.updateImage(id, nombreDelArchivo)
            const findByName = await apiMedic.updateImage(id, nombreDelArchivo)

            res.send({message: 'imagen act', findByName})
        } catch (e) {
            console.error(e);
        }
    }

    if(tipo === 'hospitales') {
        try {
            console.log(nombreDelArchivo);

            const idViejo = await apiMedic.findId(id)
            let pathViejo = './upload/usuario/' + idViejo.img

            if ( fs.existsSync(pathViejo)) {
                fs.unlink(pathViejo)
            }

            // const findByName = await apiUser.updateImage(id, nombreDelArchivo)
            const findByName = await apiHospi.updateImage(id, nombreDelArchivo)

            res.send({message: 'imagen act', findByName})
        } catch (e) {
            console.error(e);
        }
    }
}


// const subirPorTipo = (tipo, id, nombreDelArchivo, res) => {
//     return new Promise((resolve, reject) => {
//         // console.log(id);
//         const idViejo = apiUser.findById(id)
//         // let pathViejo = './upload/usuario/' + idViejo.img

//         // console.log(idViejo);
//         // if ( fs.existsSync(pathViejo)) {
//         //     fs.unlink(pathViejo)
//         // }
//         // const findByName = apiUser.updateImage(id, nombreDelArchivo)
//         resolve(idViejo)
//     })
// }


// const findAndUpdate = (nombreDelArchivo) => {
//     return new Promise((resolve, reject) => {
//         const findByName = apiUser.updateImage(id, nombreDelArchivo)
//         resolve(findByName)
//     })
// }



module.exports = {
    upload
}