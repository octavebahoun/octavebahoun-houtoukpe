const Project = require('../models/Project')

// PUBLIC
const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find()
        res.status(200).json(projects)
    } catch (error) {
        next(error)
    }
}

const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id)
        if (!project) return res.status(404).json({ error: 'Not found' })
        res.status(200).json(project)
    } catch (error) {
        next(error)
    }
}

// ADMIN
const createProject = async (req, res, next) => {
    try {
        const { title, description, shortDesc, image, techStack, links, featured } = req.body

        if (!title || !shortDesc || !image) {
            const error = new Error('Missing required fields')
            error.statusCode = 400
            throw error
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
        next(error)
    }
}

const updateProject = async (req, res, next) => {
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
        next(error)
    }
}

const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id)

        if (!project) return res.status(404).json({ error: 'Project not found' })

        res.status(200).json({ message: 'Project deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}
