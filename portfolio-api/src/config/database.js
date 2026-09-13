const mongoose = require('mongoose')
const config = require('./env')

const connectDB = async () => {
    // Réutilise la connexion existante sur Vercel (serverless / cold start)
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection
    }
    try {
        const connection = await mongoose.connect(config.mongoUri)
        console.log(`✅ MongoDB connecté: ${connection.connection.host}`)
        return connection
    } catch (error) {
        console.log(`Erreur de connection : ${error.message}`)
        throw error
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB déconnecté')
})

mongoose.connection.on('error', (err) => {
    console.log('MongoDB déconnecté')
})


module.exports = connectDB