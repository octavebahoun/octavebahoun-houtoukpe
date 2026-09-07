const mongoose = require('mongoose')
const config = require('./env')

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(config.mongoUri)
        console.log(`✅ MongoDB connecté: ${connection.connection.host}`)
        return connection
    } catch (error) {
        console.log(`Erreur de connection : ${error.message}`)
        process.exit(1)
    }
}

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB déconnecté')
})

mongoose.connection.on('error', (err) => {
    console.log('MongoDB déconnecté')
})


module.exports = connectDB