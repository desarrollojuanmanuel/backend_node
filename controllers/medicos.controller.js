const { response, request } = require('express')
const bcrypt = require('bcryptjs')
const { statusResponse, bodyError, body400 } = require('../functions/functions')
const Usuario = require('../models/usuario.model')
const { generarJWT } = require('../helpers/jwt')

// importar modelos
const Medicos = require('../models/medico.model')
const Hospital = require('../models/hospital.model')

/*-------------------------------GET Medicos------------------------------------------*/
const getMedicos = async (req = request, res = response) => {

    res.json({
        ok: true,
        Medicos: await Medicos.find().populate('hospital', 'nombre').populate('usuario', 'nombre')
    })
}
/*-------------------------------FIN GET Medicos---------------------------------------*/

/*-------------------------------POST CREAR Medicos------------------------------------------*/
const crearMedicos = async (req = request, res = response) => {

    try {
        const medicos = new Medicos({ ...req.body, usuario: req.uid })
        //console.log(Hospital.findOne({_id:req.body.idHospital}))
        await medicos.save()
        res.json({
            ok: true,
            medicos
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(process.env.ERROR_ADMIN), res)
    }
}
/*-------------------------------FIN POST CREAR Medicos--------------------------------------*/

/*-------------------------------PUT ACTUALIZAR Medicos------------------------------------------*/
const actualizarMedicos = async (req = request, res = response) => {


    try {
        const id = req.params.id
        const uid = req.uid
        const medico = await Medicos.findById(id)

        if (!medico) {
            return statusResponse(404, body400(process.env.NOT_FIND_MEDICO), res)
        }

        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medicos.findByIdAndUpdate(id, cambiosMedico, { new: true })

        res.json({
            ok: true,
            Medicos: medicoActualizado
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(process.env.ERROR_ADMIN), res)
    }


}
/*-------------------------------FIN PUT ACTUALIZAR Medicos--------------------------------------*/

/*-------------------------------DELETE BORRAR Medicos------------------------------------------*/
const borrarMedicos = async (req = request, res = response) => {
    try {
        const id = req.params.id
        const medico = await Medicos.findById(id)

        if (!medico) {
            return statusResponse(404, body400(process.env.NOT_FIND_MEDICO), res)
        }

        await Medicos.findByIdAndDelete(id)

        res.json({
            ok: true,
            msj: process.env.MEDICO_DELETE
        })
    } catch (error) {
        console.log(error)
        return statusResponse(500, bodyError(process.env.ERROR_ADMIN), res)
    }
}
/*-------------------------------FIN DELETE BORRAR Medicos--------------------------------------*/

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}