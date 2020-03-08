const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Veririca se tem token
    if(!authHeader)
        return res.status(401).send({ error: 'Token não informado '})

    // Divide o header para tirar o Bearer
    const parts = authHeader.split(' ')

    // Veririfa se o header tem as duas partes (Bearer + token)
    if(!parts.length === 2)
        return res.status(401).send({ error: 'Erro no token'})

    const [scheme, token ] = parts

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token mal formatado'})

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err) return res.status(401).send({ error: 'Token inválido'})

        req.userId = decoded.id
        return next()
    })
}