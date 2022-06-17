const express = require('express') //
require('dotenv').config()
//const cors = require('cors')
const { dbConnect } = require('./database/config')

// crear el servidor express
const app = express() // se crea el servidor

// Configurar cors
//app.use(cors())

//base de datos
dbConnect()

//Rutas
app.get('/', (request, response) => {
    response.json({
        ok: true,
        msg: 'Hola Mundo'
    })
})

// se levanta el servicio
app.listen(process.env.PORT, () => {
    console.log("servidor corriendo en puerto: 3000")
})