const mongoose = require('mongoose')
const certSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issuer: {
        type: String,
        required: true
    },
    credentialId: {
        type: String,
    },
    credentialUrl: {
        type: String
    },
    issueDate: {
        type: Date
    },
    expiryDate: {
        type: Date
    },
    image: {
        type: String,
        required: false
    },
    tags: [String],
},
    { timestamps: true })

module.exports = mongoose.model('Cert', certSchema)