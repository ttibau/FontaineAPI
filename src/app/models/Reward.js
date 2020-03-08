const mongoose = require('../../database')

// OS PRODUTOS DA LOJA

const RewardSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    picture: {
        type: String
    },
    cost: {
        type: Number, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const Reward = mongoose.model('Reward', RewardSchema)

module.exports = Reward