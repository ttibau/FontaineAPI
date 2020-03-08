const express = require('express')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth.json')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post('/register', async (req, res) => {
    const { email } = req.body
    try {

        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'Usuário já existe'})

        const user = await User.create(req.body)

        user.password = undefined

        return res.send({user, token: generateToken({ id: user.id })})
    } catch(error) {
        res.status(400).send({ error: 'Falha no registro: ' + error})
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body

    if(!email)
        return res.status(400).send({ error: 'Informe um e-mail'})

    const user = await User.findOne({ email }).select('+password')

    if(!user)
        return res.status(400).send({ error: 'Usuário não encontrado '})

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Senha inválida'})

    user.password = undefined

    // Your Hash: d3c2b218a2379106bd2763ff959fba9e
    // Your String: AndreSoCriaBatata

    res.send({ user, token: generateToken({id: user.id}) }) 

})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email })

        if(!user) 
            res.status(400).send({ error: 'Usuário não encontrado'})

        // gera um token aleatório para mandar no e-mail 
        const token = crypto.randomBytes(20).toString('hex')

        const now = new Date()
        now.setHours(now.getHours() + 1) // expira em 1h

        await User.findByIdAndUpdate(user.id, {
            '$set':{
                passwordResetToken: token, 
                passwordResetExpires: now
            }
        })

        mailer.sendMail({
            to: email, 
            from: 'tibaus@gmail.com', 
            template: 'auth/forgot_password',
            context: { token }
        }, (error => {
            if(error)
                return res.status(400).send({ error: 'Erro ao enviar e-mail de redefinição de senha '})

            return res.send()
        }))

    } catch(error) {
        res.status(400).send({ error: 'Erro ao chamar recuperação de senha, tente mais tarde.'})
    }
})

router.post('/reset-password', async (req, res) => {
    const { email, token, password } = req.body

    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires')

        if(!user) 
            return  res.status(400).send({ error: 'Usuário não encontrado '})

        if(token !== user.passwordResetToken)
            return res.status(400).send({ error: 'O token informado é inválido'})

        const now = new Date()

        if(now > user.passwordResetExpires)
            res.status(400).send({ error: 'O token informado já expirou, gere um novo'})

        user.password = password

        await user.save()

        res.send()

    } catch (error) {
        res.status(400).send({ error: 'Erro ao resetar a senha, tente novamente'})
    }
})

module.exports = app => app.use('/auth', router)