const express = require('express') //
require('dotenv').config()
const cors = require('cors')
const { dbConnect } = require('./database/config')

// crear el servidor express
const app = express() // se crea el servidor

// Configurar cors
app.use(cors())


//lectura y parseo del body
app.use(express.json())


//base de datos
dbConnect()

//Rutas
app.use('/api/usuarios', require('./routes/usuarios.route'))
app.use('/api/login', require('./routes/login.route'))

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