const express = require('express')
const router = express.Router()

const projectController = require('../controllers/projectController')
const blogController = require('../controllers/blogController')
const certController = require('../controllers/certController')
const aboutController = require('../controllers/aboutController')
const landingController = require('../controllers/landingController')

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Récupère tous les projets
 *     description: Retourne la liste complète de tous les projets du portfolio
 *     tags:
 *       - Projects
 *     responses:
 *       200:
 *         description: Liste des projets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/projects', projectController.getAllProjects)

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Récupère un projet par ID
 *     description: Retourne les détails complets d'un projet spécifique
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ID du projet
 *     responses:
 *       200:
 *         description: Détails du projet
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Projet non trouvé
 *       500:
 *         description: Erreur serveur
 */
// GET /api/projects/:id
router.get('/projects/:id', projectController.getProjectById)

/**
 * @swagger
 * /blog:
 *   get:
 *     summary: Récupère tous les articles publiés
 *     description: Retourne la liste des articles de blog marqués comme publiés
 *     tags:
 *       - Blog
 *     responses:
 *       200:
 *         description: Liste des articles publiés
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       500:
 *         description: Erreur serveur
 */
router.get('/blog', blogController.getPublishedBlogs)

/**
 * @swagger
 * /blog/{slug}:
 *   get:
 *     summary: Récupère un article par slug
 *     description: Retourne le contenu complet d'un article spécifique
 *     tags:
 *       - Blog
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: URL slug de l'article
 *     responses:
 *       200:
 *         description: Contenu de l'article
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Blog'
 *       404:
 *         description: Article non trouvé
 *       500:
 *         description: Erreur serveur
 */
router.get('/blog/:slug', blogController.getBlogBySlug)

/**
 * @swagger
 * /certs:
 *   get:
 *     summary: Récupère toutes les certifications
 *     description: Retourne la liste complète des certifications et accréditations
 *     tags:
 *       - Certifications
 *     responses:
 *       200:
 *         description: Liste des certifications
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cert'
 *       500:
 *         description: Erreur serveur
 */
router.get('/certs', certController.getAllCerts)

/**
 * @swagger
 * /about:
 *   get:
 *     summary: Récupère la section "À propos"
 *     description: Retourne le contenu unique de la page À propos (bio, compétences, liens sociaux)
 *     tags:
 *       - About
 *     responses:
 *       200:
 *         description: Section À propos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/About'
 *       404:
 *         description: Section non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/about', aboutController.getAbout)

/**
 * @swagger
 * /landing:
 *   get:
 *     summary: Récupère le contenu de la page d'accueil
 *     description: Retourne le contenu complet de la landing page (hero, projets sélectionnés, CTA, footer)
 *     tags:
 *       - Landing
 *     responses:
 *       200:
 *         description: Contenu de la landing page
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hero:
 *                   type: object
 *                 selectedWork:
 *                   type: object
 *                   properties:
 *                     content:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Project'
 *                 cta:
 *                   type: object
 *                 footer:
 *                   type: object
 *       404:
 *         description: Landing non trouvée
 *       500:
 *         description: Erreur serveur
 */
router.get('/landing', landingController.getLanding)

module.exports = router