const { response, request } = require('express')
const { statusResponse, bodyError, body400 } = require('../functions/functions')

// importar modelos
const Usuario = require('../models/usuario.model')
const Hospital = require('../models/hospital.model')
const Medicos = require('../models/medico.model')

/*-------------------------------GET Todos ------------------------------------------*/
const getTodos = async (req = request, res = response) => {

    const texto = req.params.texto
    const regex = new RegExp(texto, 'i')

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medicos.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        data: [{
            usuarios,
            medicos,
            hospitales
        }]
    })
}
/*-------------------------------FIN GET Todos---------------------------------------*/

/*-------------------------------GET Documento sColeccion  ------------------------------------------*/
const getDocumentosColeccion = async (req = request, res = response) => {

    const tabla = req.params.tabla
    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda, 'i')
    let data = []

    switch (tabla) {
        case 'medicos':
            data = await Medicos.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img')
            break;
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;

        default:
            return statusResponse(400, body400(`La tabla debe ser medicos, hospitales y/o usuarios`), res)
            break;
    }

    res.json({
        ok: true,
        data
    })
}
/*-------------------------------FIN GET Documento sColeccion ---------------------------------------*/

module.exports = {
    getTodos,
    getDocumentosColeccion,
}