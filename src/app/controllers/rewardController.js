const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
const Reward = require('../models/Reward')

router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        const reward = await Reward.find()
        return res.send({ reward })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar novo recompensa'})
    }
})

router.get('/:rewardId', async (req, res) => {
    try {
        const reward = await Reward.findById(req.params.rewardId)
        return res.send({ reward })
    } catch (error) {
        res.status(400).send({ error: 'Erro ao buscar um recompensa'})
    }
})

router.post('/', async (req, res) => {
    try {
        const reward = await Reward.create({ ...req.body, user: req.userId })
        return res.send({ reward })

    } catch (error) {
        res.status(400).send({ error: 'Erro ao criar novo recompensa'})
    }
})

router.put('/:rewardId', async (req, res) => {
    try {
        const reward = await Reward.findByIdAndUpdate(req.params.rewardId, 
            { ...req.body },
            { new: true })
        return res.send({ reward })

    } catch (error) {
        res.status(400).send({ error: 'Erro ao editar recompensa'})
    }
})

router.delete('/:rewardId', async (req, res) => {
    try {
        await Reward.findByIdAndRemove(req.params.rewardId)
        return res.send()
    } catch (error) {
        res.status(400).send({ error: 'Erro ao cexcluir recompensa'})
    }
})

module.exports = app => app.use('/rewards', router)