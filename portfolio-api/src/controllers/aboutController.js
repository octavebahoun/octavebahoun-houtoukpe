const About = require('../models/About')

// PUBLIC
const getAbout = async (req, res, next) => {
    try {
        const data = await About.findOne()
        if (!data) return res.status(404).json({ error: 'Not Found' })
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

// ADMIN
const updateAbout = async (req, res, next) => {
    try {
        const { bio, skills, socialLinks } = req.body

        let about = await About.findOne()

        if (!about) {
            about = new About({ bio, skills, socialLinks })
        } else {
            about.bio = bio || about.bio
            about.skills = skills || about.skills
            about.socialLinks = socialLinks || about.socialLinks
        }

        await about.save()
        res.status(200).json({ message: 'About updated', about })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAbout,
    updateAbout
}
