const Landing = require('../models/Landing')

// PUBLIC
const getLanding = async (req, res, next) => {
    try {
        const landingFull = await Landing.findOne()
            .populate('selectedWork.content')
            .exec()
        if (!landingFull) return res.status(404).json({ error: 'Not Found' })
        res.status(200).json(landingFull)
    } catch (error) {
        next(error)
    }
}

// ADMIN
const updateLanding = async (req, res, next) => {
    try {
        const { hero, selectedWork, skills, cta, footer } = req.body

        let landing = await Landing.findOne()

        if (!landing) {
            landing = new Landing({ hero, selectedWork, skills, cta, footer })
        } else {
            landing.hero = hero || landing.hero
            landing.selectedWork = selectedWork || landing.selectedWork
            landing.skills = skills || landing.skills
            landing.cta = cta || landing.cta
            landing.footer = footer || landing.footer
        }

        await landing.save()
        res.status(200).json({ message: 'Landing updated', landing })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getLanding,
    updateLanding
}
