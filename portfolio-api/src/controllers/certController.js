const Cert = require('../models/Cert')

// PUBLIC
const getAllCerts = async (req, res, next) => {
    try {
        const certificats = await Cert.find()
        res.status(200).json(certificats)
    } catch (error) {
        next(error)
    }
}

// ADMIN
const createCert = async (req, res, next) => {
    try {
        const { title, issuer, credentialId, credentialUrl, issueDate, expiryDate, image } = req.body

        if (!title || !issuer || !image) {
            const error = new Error('Missing required fields')
            error.statusCode = 400
            throw error
        }

        const cert = new Cert({
            title,
            issuer,
            credentialId,
            credentialUrl,
            issueDate,
            expiryDate,
            image
        })

        await cert.save()
        res.status(201).json({ message: 'Cert created', cert })
    } catch (error) {
        next(error)
    }
}

const updateCert = async (req, res, next) => {
    try {
        const { title, issuer, credentialId, credentialUrl, issueDate, expiryDate, image } = req.body

        const cert = await Cert.findByIdAndUpdate(
            req.params.id,
            { title, issuer, credentialId, credentialUrl, issueDate, expiryDate, image },
            { new: true }
        )

        if (!cert) return res.status(404).json({ error: 'Cert not found' })

        res.status(200).json({ message: 'Cert updated', cert })
    } catch (error) {
        next(error)
    }
}

const deleteCert = async (req, res, next) => {
    try {
        const cert = await Cert.findByIdAndDelete(req.params.id)

        if (!cert) return res.status(404).json({ error: 'Cert not found' })

        res.status(200).json({ message: 'Cert deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCerts,
    createCert,
    updateCert,
    deleteCert
}
