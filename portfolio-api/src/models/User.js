const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true, },
    email: { type: String, required: true },
    avatar: { type: String },
    isAdmin: { type: Boolean, default: false },
},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)