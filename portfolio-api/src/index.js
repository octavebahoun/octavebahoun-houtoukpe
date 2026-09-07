// 1. IMPORTS
const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./config/swagger')
const corsOptions = require('./middlewares/corsOptions')
const config = require('./config/env')
const connectDB = require('./config/database')
const passport = require('./config/passport')

// 2. CRÉER APP
const app = express()

// 3. MIDDLEWARES GLOBAUX
// CORS
app.use(cors(corsOptions))

// Parser JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Passport
app.use(passport.initialize())

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
        url: '/api-docs/spec',
        persistAuthorization: true,
    },
}))
app.get('/api-docs/spec', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
})

// Error handler
app.use(require('./middlewares/errorHandler'))

async function startServer() {
    try {
        await connectDB()
        console.log('Connection à la base de donné ')

        // 5. ROUTES PUBLIQUES
        app.use('/api', require('./routes/public'))

        // 6. ROUTES ADMIN (protégées)
        app.use('/api/admin', require('./routes/admin'))

        // 7. ERROR HANDLER (à la fin)
        app.use(require('./middlewares/errorHandler'))

        app.listen(config.port, () => {
            console.log(`API running on port ${config.port}`)
            console.log(`Environment: ${config.nodeEnv}`)
        })
    } catch (error) {
        console.error('❌ Failed to start server:', error)
        process.exit(1)
    }
}

startServer();