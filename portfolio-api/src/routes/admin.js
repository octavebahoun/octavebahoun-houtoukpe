const express = require('express')
const router = express.Router()
const passport = require('passport')
const auth = require('../middlewares/auth')

// Controllers
const authController = require('../controllers/authController')
const projectController = require('../controllers/projectController')
const blogController = require('../controllers/blogController')
const certController = require('../controllers/certController')
const aboutController = require('../controllers/aboutController')
const landingController = require('../controllers/landingController')

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
    authController.githubCallback
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
router.post('/projects', auth, projectController.createProject)

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
router.put('/projects/:id', auth, projectController.updateProject)

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
router.delete('/projects/:id', auth, projectController.deleteProject)


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
router.post('/blog', auth, blogController.createBlog)

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
router.put('/blog/:id', auth, blogController.updateBlog)

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
router.delete('/blog/:id', auth, blogController.deleteBlog)

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
router.post('/certs', auth, certController.createCert)

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
router.put('/certs/:id', auth, certController.updateCert)

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
router.delete('/certs/:id', auth, certController.deleteCert)

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
router.put('/about', auth, aboutController.updateAbout)

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
router.put('/landing', auth, landingController.updateLanding)

module.exports = router