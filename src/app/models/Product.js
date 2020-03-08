const mongoose = require('../../database')

// OS PRODUTOS DA LOJA

const ProductSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product