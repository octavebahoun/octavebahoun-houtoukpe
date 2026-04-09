const mongoose = require('mongoose')

const landingSchema = mongoose.Schema({
    hero: {
        work: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        shortabout: {
            type: String
        },
        image: {
            type: String,
            required: true
        }
    },
    selectedWork: {
        overtext: {
            type: String,
            required: true
        },
        content: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project'
        }],
        seeall: {
            type: String,
        }
    },
    skills: [{
        name: { type: String },
        icon: { type: String }
    }],
    cta: {
        firsttext: {
            type: String,
            required: true
        },
        secondtext: {
            type: String,
            required: true
        },
    },
    footer: {
        work: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        contact: {
            type: String
        },
        link: {
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
    }
},
    { timestamps: true })

module.exports = mongoose.model('Landing', landingSchema)