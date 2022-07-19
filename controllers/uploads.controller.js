const { response, request } = require('express')
const fs = require('fs')
const path = require('path')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');

// importar modelos
const Usuario = require('../models/usuario.model')
const Hospital = require('../models/hospital.model')
const Medicos = require('../models/medico.model');


/*-------------------------------GET fileUpload ------------------------------------------*/


const file_Upload = async (req = request, res = response) => {

    let tipo = req.params.tipo
    let id = req.params.id

    //valia
    let tiposValidos = ['hospitales', 'medicos', 'usuarios']

    //validar el tipo
    if (!tiposValidos.includes(tipo)) {
        return statusResponse(400, body400(`El tipo debe ser medicos, hospitales y/o usuarios`), res)
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return statusResponse(400, body400(`No existen archivos`), res)
    }

    //procesar una imagen
    let file = req.files.imagen
    let nombreCortado = file.name.split('.')
    let ext = nombreCortado[nombreCortado.length - 1]
    let extValidas = ['jpg', 'png', 'jpeg', 'gif']
    if (!extValidas.includes(ext.toLowerCase())) {
        return statusResponse(400, body400(`La extension ${ext} no es permitida`), res)
    }

    //generar el nombre del archivo
    let nombreArchivo = `${uuidv4()}.${ext.toLowerCase()}`

    //path para gaurdar la imagen
    let pathimg = `./uploads/${tipo}/${nombreArchivo}`

    //mover la imagen
    file.mv(pathimg, function (err) {
        if (err) {
            return statusResponse(400, body400(`Error al guardar la imagen`), res)
        }
    })

    //actualizar base de datos
    actualizarImagen(tipo, id, nombreArchivo)

    res.json({
        ok: true,
        msj: 'Archivo cargado correctamente',
        nombreArchivo
    })
}
/*-------------------------------FIN GET fileUpload---------------------------------------*/


const getImagen = (req = request, res = response) => {
    let { tipo, foto } = req.params
    let pathimg = path.join(__dirname, `../uploads/${tipo}/${foto}`)

    if (!fs.existsSync(pathimg)) {
        pathimg = path.join(__dirname, `../uploads/nofound.jpg`)
    }

    res.sendFile(pathimg)
}



module.exports = {
    file_Upload,
    getImagen
}