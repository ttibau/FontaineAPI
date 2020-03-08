const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
const Product = require('../models/Product')

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const product = await Product.find()
        return res.send({ product })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar novo produto'})
    }
})

router.get('/:productId', async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId)
        return res.send({ product })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao buscar um produto'})
    }
})

router.post('/', async (req, res) => {
    try {
        const product = await Product.create({ ...req.body, user: req.userId })
        return res.send({ product })

    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar novo produto'})
    }
})

router.put('/:productId', async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.productId, 
            { ...req.body },
            { new: true })
        return res.send({ product })

    } catch (error) {
        res.status(400).send({ error: 'Erro ao editar produto'})
    }
})

router.delete('/:productId', async (req, res) => {
    try {
        await Product.findByIdAndRemove(req.params.productId)
        return res.send()
    } catch (error) {
        res.status(400).send({ error: 'Erro ao cexcluir produto'})
    }
})

module.exports = app => app.use('/products', router)