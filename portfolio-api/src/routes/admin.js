const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const passport = require('passport')
const config = require('../config/env')
const auth = require('../middlewares/auth')

// Models
const Project = require('../models/Project')
const Blog = require('../models/Blog')
const Cert = require('../models/Cert')
const About = require('../models/About')
const Landing = require('../models/Landing')
const User = require('../models/User')

// ============================================================
// 🔐 AUTHENTIFICATION GITHUB OAUTH
// ============================================================

/**
 * @swagger
 * /admin/auth/github:
 *   get:
 *     summary: Initie l'authentification GitHub OAuth
 *     description: Redirige vers GitHub pour l'authentification. Seul Oktav (ID GitHub 204796358) peut se connecter comme admin.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirection vers GitHub OAuth
 */
// GET /api/admin/auth/github
// Redirect vers GitHub OAuth
router.get('/auth/github', passport.authenticate('github', {
    scope: ['user:email']
}))

/**
 * @swagger
 * /admin/auth/callback:
 *   get:
 *     summary: Callback OAuth depuis GitHub
 *     description: Reçoit le code d'autorisation GitHub et génère un JWT. Redirige vers l'admin avec le token en query.
 *     tags:
 *       - Authentication
 *     responses:
 *       302:
 *         description: Redirection vers l'admin avec token en query
 *       401:
 *         description: Authentification échouée (non-admin)
 */
// GET /api/admin/auth/callback
// Callback depuis GitHub - génère JWT
router.get('/auth/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
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
            res.status(500).json({ error: error.message })
        }
    }
)

// ============================================================
// 📁 PROJECTS ADMIN CRUD
// ============================================================

/**
 * @swagger
 * /admin/projects:
 *   post:
 *     summary: Créer un nouveau projet
 *     description: Crée un nouveau projet (authentification requise)
 *     tags:
 *       - Admin - Projects
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, shortDesc, image]
 *             properties:
 *               title: { type: string }
 *               shortDesc: { type: string }
 *               description: { type: string }
 *               image: { type: string }
 *               techStack: { type: array, items: { type: string } }
 *               links: { type: object }
 *               featured: { type: boolean }
 *     responses:
 *       201:
 *         description: Projet créé avec succès
 *       400:
 *         description: Champs obligatoires manquants
 *       401:
 *         description: Non authentifié
 *       500:
 *         description: Erreur serveur
 */
// POST /api/admin/projects - Créer projet
router.post('/projects', auth, async (req, res) => {
    try {
        const { title, description, shortDesc, image, techStack, links, featured } = req.body

        if (!title || !shortDesc || !image) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const project = new Project({
            title,
            description,
            shortDesc,
            image,
            techStack,
            links,
            featured: featured || false
        })

        await project.save()
        res.status(201).json({ message: 'Project created', project })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /admin/projects/{id}:
 *   put:
 *     summary: Mettre à jour un projet
 *     description: Met à jour les informations d'un projet existant
 *     tags:
 *       - Admin - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               shortDesc: { type: string }
 *               image: { type: string }
 *               techStack: { type: array, items: { type: string } }
 *               links: { type: object }
 *               featured: { type: boolean }
 *     responses:
 *       200:
 *         description: Projet mis à jour
 *       404:
 *         description: Projet non trouvé
 *       401:
 *         description: Non authentifié
 */
// PUT /api/admin/projects/:id - Update projet
router.put('/projects/:id', auth, async (req, res) => {
    try {
        const { title, description, shortDesc, image, techStack, links, featured } = req.body

        const project = await Project.findByIdAndUpdate(
            req.params.id,
            { title, description, shortDesc, image, techStack, links, featured },
            { new: true }
        )

        if (!project) return res.status(404).json({ error: 'Project not found' })

        res.status(200).json({ message: 'Project updated', project })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /admin/projects/{id}:
 *   delete:
 *     summary: Supprimer un projet
 *     description: Supprime définitivement un projet
 *     tags:
 *       - Admin - Projects
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: Projet supprimé
 *       404:
 *         description: Projet non trouvé
 *       401:
 *         description: Non authentifié
 */
// DELETE /api/admin/projects/:id - Supprimer projet
router.delete('/projects/:id', auth, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)

        if (!project) return res.status(404).json({ error: 'Project not found' })

        res.status(200).json({ message: 'Project deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ============================================================
// 📰 BLOG ADMIN CRUD
// ============================================================

/**
 * @swagger
 * /admin/blog:
 *   post:
 *     summary: Créer un nouvel article
 *     tags: [Admin - Blog]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: {type: string}
 *               slug: {type: string}
 *               content: {type: string}
 *               excerpt: {type: string}
 *               published: {type: boolean}
 *     responses:
 *       201: {description: Article créé}
 */
// POST /api/admin/blog - Créer article
router.post('/blog', auth, async (req, res) => {
    try {
        const { title, slug, content, excerpt, image, tags, published } = req.body

        if (!title || !slug) {
            return res.status(400).json({ error: 'Missing required fields' })
        }

        const blog = new Blog({
            title,
            slug,
            content,
            excerpt,
            image,
            tags,
            published: published || false,
            publishedAt: published ? new Date() : null
        })

        await blog.save()
        res.status(201).json({ message: 'Blog created', blog })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /admin/blog/{id}:
 *   put:
 *     summary: Mettre à jour un article
 *     tags: [Admin - Blog]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: string}}
 *     responses:
 *       200: {description: Article mis à jour}
 */
// PUT /api/admin/blog/:id - Update article
router.put('/blog/:id', auth, async (req, res) => {
    try {
        const { title, slug, content, excerpt, image, tags, published } = req.body

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                slug,
                content,
                excerpt,
                image,
                tags,
                published,
                publishedAt: published ? new Date() : null
            },
            { new: true }
        )

        if (!blog) return res.status(404).json({ error: 'Blog not found' })

        res.status(200).json({ message: 'Blog updated', blog })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /admin/blog/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     tags: [Admin - Blog]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: string}}
 *     responses:
 *       200: {description: Article supprimé}
 */
// DELETE /api/admin/blog/:id - Supprimer article
router.delete('/blog/:id', auth, async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)

        if (!blog) return res.status(404).json({ error: 'Blog not found' })

        res.status(200).json({ message: 'Blog deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ============================================================
// 🏆 CERTS ADMIN CRUD
// ============================================================

/**
 * @swagger
 * /admin/certs:
 *   post:
 *     summary: Créer une certification
 *     tags: [Admin - Certifications]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: {type: string}
 *               issuer: {type: string}
 *               credentialId: {type: string}
 *               credentialUrl: {type: string}
 *     responses:
 *       201: {description: Certification créée}
 */
// POST /api/admin/certs - Créer certif
router.post('/certs', auth, async (req, res) => {
    try {
        const { title, issuer, credentialId, credentialUrl, issueDate, expiryDate, image } = req.body

        if (!title || !issuer || !image) {
            return res.status(400).json({ error: 'Missing required fields' })
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
        res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /admin/certs/{id}:
 *   put:
 *     summary: Mettre à jour une certification
 *     tags: [Admin - Certifications]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: string}}
 *     responses:
 *       200: {description: Certification mise à jour}
 */
// PUT /api/admin/certs/:id - Update certif
router.put('/certs/:id', auth, async (req, res) => {
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
        res.status(500).json({ error: error.message })
    }
})

/**
 * @swagger
 * /admin/certs/{id}:
 *   delete:
 *     summary: Supprimer une certification
 *     tags: [Admin - Certifications]
 *     security: [{bearerAuth: []}]
 *     parameters:
 *       - {in: path, name: id, required: true, schema: {type: string}}
 *     responses:
 *       200: {description: Certification supprimée}
 */
// DELETE /api/admin/certs/:id - Supprimer certif
router.delete('/certs/:id', auth, async (req, res) => {
    try {
        const cert = await Cert.findByIdAndDelete(req.params.id)

        if (!cert) return res.status(404).json({ error: 'Cert not found' })

        res.status(200).json({ message: 'Cert deleted' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// ============================================================
// 👤 ABOUT ADMIN (Singleton)
// ============================================================

/**
 * @swagger
 * /admin/about:
 *   put:
 *     summary: Mettre à jour la section À propos
 *     tags: [Admin - About]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bio: {type: string}
 *               skills: {type: array}
 *               socialLinks: {type: object}
 *     responses:
 *       200: {description: Section About mise à jour}
 */
// PUT /api/admin/about - Update About
router.put('/about', auth, async (req, res) => {
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
        res.status(500).json({ error: error.message })
    }
})

// ============================================================
// 🏠 LANDING ADMIN (Singleton)
// ============================================================

/**
 * @swagger
 * /admin/landing:
 *   put:
 *     summary: Mettre à jour la page d'accueil
 *     tags: [Admin - Landing]
 *     security: [{bearerAuth: []}]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hero: {type: object}
 *               selectedWork: {type: object}
 *               skills: {type: array}
 *               cta: {type: object}
 *               footer: {type: object}
 *     responses:
 *       200: {description: Landing page mise à jour}
 */
// PUT /api/admin/landing - Update Landing
router.put('/landing', auth, async (req, res) => {
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
        res.status(500).json({ error: error.message })
    }
})

module.exports = router