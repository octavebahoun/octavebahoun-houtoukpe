const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const config = require('./env')
const User = require('../models/User')

passport.use(
    new GitHubStrategy({
        clientID: config.github.clientId,
        clientSecret: config.github.clientSecret,
        callbackURL: '/api/admin/auth/github/callback'
    },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    githubId: profile.id
                })

                if (user) {
                    return done(null, user)
                } // l'utilisateur existe deja 
                user = await User.create({
                    githubId: profile.id,
                    username: profile.username,
                    email: profile.emails?.[0]?.value,
                    avatar: profile.photos?.[0]?.value,
                    isAdmin: profile.id === 204796358,
                })

                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})
module.exports = passport