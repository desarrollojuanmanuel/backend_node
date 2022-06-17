const mongoose = require('mongoose');


const dbConnect = async () => {

    try {
        await mongoose.connect(process.env.DB_CDN)
        console.log("DB Online")
    } catch (error) {
        console.log(error)
        throw new Error('Error en la conexion de DB')
    }

}

module.exports = {
    dbConnect
}