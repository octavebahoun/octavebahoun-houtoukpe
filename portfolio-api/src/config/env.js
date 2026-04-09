require('dotenv').config()

const config = {

    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI,
    nodeEnv: process.env.NODE_ENV,
    github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    urls: {
        frontend: process.env.FRONTEND_URL,
        admin: process.env.ADMIN_URL
    }
}

const requiredVars = ['JWT_SECRET', 'FRONTEND_URL', 'ADMIN_URL', 'GITHUB_CLIENT_SECRET', 'MONGODB_URI', 'GITHUB_CLIENT_ID', 'PORT']

requiredVars.forEach(varname => {
    if (!process.env[varname]) {
        console.log(`Variable d'environnement manquante : ${varname} `);
git 
    }
})

module.exports = config;