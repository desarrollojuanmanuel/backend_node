const jwt = require("jsonwebtoken")

const generarJWT = (uid) => {

    return new Promise((resolve, rject) => {
        const payload = {
            uid
        }
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err)
                reject(`error al generar el token ${err}`)
            } else {
                resolve(token)
            }
        })
    })

}

module.exports = {
    generarJWT
}