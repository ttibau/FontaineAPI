const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://AdminTibau:YihdGI06waYzktjt@cluster0-2k7ez.gcp.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, })
mongoose.Promise = global.Promise

module.exports = mongoose