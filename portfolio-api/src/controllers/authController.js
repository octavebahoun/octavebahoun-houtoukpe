const jwt = require('jsonwebtoken')
const config = require('../config/env')

const githubCallback = (req, res, next) => {
    try {
        // req.user = user depuis Passport
        const token = jwt.sign(
            {
                id: req.user._id,
                githubId: req.user.githubId,
                username: req.user.username,
                isAdmin: req.user.isAdmin
            },
            config.jwt.secret,
            { expiresIn: '7d' }
        )

        // Redirect admin avec token en query (frontend récupère)
        res.redirect(`${config.urls.admin}?token=${token}`)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    githubCallback
}
