const jwt = require("jsonwebtoken")

const validarJWT = (req, res, next) => {
    //leer el token
    const token = req.header('x-token')
    //existe el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No existe token'
        })
    }
    // valida token generado
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET)
        res.uid = uid
        next()
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        })
    }
}

module.exports = {
    validarJWT
}