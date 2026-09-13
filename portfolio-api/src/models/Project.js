const mongoose = require('mongoose')

const userProject = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    shortDesc: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    challenge: {
        type: String
    },
    solution: {
        type: String
    },
    impact: {
        type: String
    },
    features: [String],
    techStack: [String],
    links: {
        github: { type: String },
        live: { type: String }
    },
    collaborators: [String],
    stars: {
        type: Number
    },
    featured: {
        type: Boolean
    },
},
    { timestamps: true })

module.exports = mongoose.model('Project', userProject)