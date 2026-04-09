const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        required: true
    },
    content: {
        type: String,
    },
    excerpt: {
        type: String
    },
    image: {
        type: String
    },
    tags: [String],
    published: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type: Date
    },
    author : {
        type :String 
    }
},
    { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)