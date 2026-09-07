const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Portfolio API (CMS Headless)',
            version: '1.0.0',
            description: 'API REST pour gérer le contenu du portfolio Oktav Bahoun. Authentification GitHub OAuth + JWT.',
            contact: {
                name: 'Oktav Bahoun',
                url: 'https://portfolio.oktav.dev',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Développement',
            },
            {
                url: 'https://api.portfolio.oktav.dev',
                description: 'Production',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token obtenu via OAuth GitHub callback',
                },
            },
            schemas: {
                Project: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string', description: 'MongoDB ID' },
                        title: { type: 'string' },
                        shortDesc: { type: 'string' },
                        description: { type: 'string' },
                        techStack: { type: 'array', items: { type: 'string' } },
                        links: {
                            type: 'object',
                            properties: {
                                github: { type: 'string' },
                                live: { type: 'string' },
                            },
                        },
                        collaborators: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    username: { type: 'string' },
                                    avatar: { type: 'string' },
                                },
                            },
                        },
                        stars: { type: 'number' },
                        featured: { type: 'boolean' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Blog: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        slug: { type: 'string' },
                        content: { type: 'string' },
                        excerpt: { type: 'string' },
                        tags: { type: 'array', items: { type: 'string' } },
                        published: { type: 'boolean' },
                        publishedAt: { type: 'string', format: 'date-time' },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Cert: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        issuer: { type: 'string' },
                        credentialId: { type: 'string' },
                        credentialUrl: { type: 'string' },
                        issueDate: { type: 'string', format: 'date' },
                        expiryDate: { type: 'string', format: 'date' },
                        image: { type: 'string' },
                        tags: { type: 'array', items: { type: 'string' } },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                About: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        bio: { type: 'string' },
                        skills: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    name: { type: 'string' },
                                    level: { type: 'number', minimum: 1, maximum: 5 },
                                },
                            },
                        },
                        socialLinks: {
                            type: 'object',
                            properties: {
                                linkedin: { type: 'string' },
                                twitter: { type: 'string' },
                                github: { type: 'string' },
                            },
                        },
                        createdAt: { type: 'string', format: 'date-time' },
                        updatedAt: { type: 'string', format: 'date-time' },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                        status: { type: 'number' },
                        timestamp: { type: 'string', format: 'date-time' },
                    },
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
