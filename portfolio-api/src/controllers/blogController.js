const Blog = require('../models/Blog')

// PUBLIC
const getPublishedBlogs = async (req, res, next) => {
    try {
        const content = await Blog.find({ published: true })
        res.status(200).json(content)
    } catch (error) {
        next(error)
    }
}

const getBlogBySlug = async (req, res, next) => {
    try {
        const data = await Blog.findOne({ slug: req.params.slug })
        if (!data) return res.status(404).json({ error: 'Not found' })
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

// ADMIN
const createBlog = async (req, res, next) => {
    try {
        const { title, slug, content, excerpt, image, tags, published } = req.body

        if (!title || !slug) {
            const error = new Error('Missing required fields')
            error.statusCode = 400
            throw error
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
        next(error)
    }
}

const updateBlog = async (req, res, next) => {
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
        next(error)
    }
}

const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id)

        if (!blog) return res.status(404).json({ error: 'Blog not found' })

        res.status(200).json({ message: 'Blog deleted' })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getPublishedBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog
}
