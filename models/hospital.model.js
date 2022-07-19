const { Schema, model } = require('mongoose')

const HospitalSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        require: true,
        type: String,
    },
    usuario:{
        require: true,
        type: Schema.Types.ObjectId, // indica referencia con otro esquema
        ref: 'Usuario'
    }

}, {collection: 'hospitales'}) // indica el nombre que se debe cololar en la base de datos

// Extrae los atributos del objeto que no quiere retornar o que le quiere cambiar el nombre
HospitalSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Hospital', HospitalSchema)