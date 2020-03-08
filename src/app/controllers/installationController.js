const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
const Instalation = require('../models/Instalation')

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const instalations = await Instalation.find().populate('user').populate('product')
        return res.send({ instalations })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.get('/:instalationId', async (req, res) => {
    try {
        const instalation = await Instalation.findById(req.params.instalationId).populate('user').populate('product')
        return res.send({ instalation })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.post('/', async (req, res) => {
    try {
        const instalation = await Instalation.create({ ...req.body, user: req.userId, product: req.body.productId })
        return res.send({ instalation })

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.put('/:instalationId', async (req, res) => {
    try {
        const instalation = await Instalation.findByIdAndUpdate(req.params.instalationId, 
            { ...req.body },
            { new: true })
        return res.send({ instalation })

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.delete('/:instalationId', async (req, res) => {
    try {
        await Instalation.findByIdAndRemove(req.params.instalationId)
        return res.send()
    } catch (error) {
        res.status(400).send({ error: 'Erro ao cexcluir instalacao'})
    }
})

module.exports = app => app.use('/installations', router)