// importar modelos
const fs = require('fs')
const Usuario = require('../models/usuario.model')
const Hospital = require('../models/hospital.model')
const Medicos = require('../models/medico.model');

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let model = ''
    let bool = false
    switch (tipo) {
        case 'medicos':
            model = await Medicos.findById(id)
            bool = true
            break;
        case 'hospitales':
            model = await Hospital.findById(id)
            bool = true
            break;
        case 'usuarios':
            model = await Usuario.findById(id)
            bool = true
            break;
    }
    if (bool) {
        old_path(tipo, model, nombreArchivo)
    }
}

const old_path = async (tipo, model, nombreArchivo) => {
    if (!model) {
        console.log(`No existe el ${tipo}`)
        return false
    }
    let oldpath = `./uploads/${tipo}/${model.img}`

    if (fs.existsSync(oldpath)) {
        // borra la imagen
        fs.unlinkSync(oldpath)
    }
    model.img = nombreArchivo
    await model.save()
    return true
}

module.exports = {
    actualizarImagen
}