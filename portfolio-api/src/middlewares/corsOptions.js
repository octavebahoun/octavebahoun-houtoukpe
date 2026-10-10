const corsOptions = {
    origin: (origin, callback) => {
        const config = require('../config/env')
        const allowedOrigins = [
            config.urls.frontend,
            config.urls.admin,
            'http://localhost:5173',
            'http://localhost:5174'
        ]

        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

module.exports = corsOptions