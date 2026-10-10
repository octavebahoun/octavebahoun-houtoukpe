const mongoose = require('mongoose')

const aboutSchema = mongoose.Schema({
    bio: {
        type: String,
        required: true
    },
    skills: [{
        name: { type: String, required: true },
        level: { type: Number, min: 1, max: 5 }
    }],
    socialLinks: {
        linkedin: {
            type: String
        },
        twitter: {
            type: String
        },
        github: {
            type: String
        },
        stackoverflow: {
            type: String
        },
        gravatar: {
            type: String
        },
        intagram: {
            type: String
        },
        facebook: {
            type: String
        },
        whatsapp: {
            type: String
        }
    }
},
    { timestamps: true })

module.exports = mongoose.model('About', aboutSchema)