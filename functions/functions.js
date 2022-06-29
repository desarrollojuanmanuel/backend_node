const statusResponse = (status, body = {}, res) => {
    return res.status(status).json(body)
}

const bodyError = (error) => {
    return {
        ok: false,
        error
    }
}

const body400 = (msj) => {
    return {
        ok: false,
        msj
    }
}

module.exports = {
    statusResponse,
    bodyError,
    body400
}