const { Schema, model } = require('mongoose')

const MedicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String,
    },
    hospital:{
        type: Schema.Types.ObjectId, // indica referencia con otro esquema
        ref: 'Hospital',
        require: true
    },
    usuario:{
        type: Schema.Types.ObjectId, // indica referencia con otro esquema
        ref: 'Usuario',
        require: true
    },

}, {collection: 'medicos'}) // indica el nombre que se debe cololar en la base de datos

// Extrae los atributos del objeto que no quiere retornar o que le quiere cambiar el nombre
MedicoSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject()
    return object
})

module.exports = model('Medicos', MedicoSchema)