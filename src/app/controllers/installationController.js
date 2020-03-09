const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
const Installation = require('../models/Installation')

router.use(authMiddleware)

router.get('/', async (req, res) => {
    console.log('asdasdkalksd')
    try {
        const instalations = await Installation.find().populate('user').populate('product')
        return res.send({ instalations })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.get('/myInstallations', async (req, res) => {
    try {
        const installations = await Installation.find({ user: req.userId })
        return res.send({ installations })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao buscar minhas instalações'})
    }
})

router.get('/:instalationId', async (req, res) => {
    try {
        const instalation = await Installation.findById(req.params.instalationId).populate('user').populate('product')
        return res.send({ instalation })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.post('/', async (req, res) => {
    try {
        const instalation = await Installation.create({ ...req.body, user: req.userId, product: req.body.productId })
        return res.send({ instalation })

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: 'Erro ao criar nova instalacao'})
    }
})

router.put('/:instalationId', async (req, res) => {
    try {
        const instalation = await Installation.findByIdAndUpdate(req.params.instalationId, 
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
        await Installation.findByIdAndRemove(req.params.instalationId)
        return res.send()
    } catch (error) {
        res.status(400).send({ error: 'Erro ao cexcluir instalacao'})
    }
})

module.exports = app => app.use('/installations', router)