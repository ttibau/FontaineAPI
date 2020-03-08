const mongoose = require('../../database')

const InstalationSchema = new mongoose.Schema({
    code: {
        type: String, 
        required: true
    },
    address: {
        required: true, 
        type: String, 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

const Instalation = mongoose.model('Instalation', InstalationSchema)


module.exports = Instalation