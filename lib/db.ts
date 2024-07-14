import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGO_URI || ""

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env',
    )
}

async function dbConnect() {
    try {
        const opts = {
            bufferCommands: false,
            dbName: "fomo_factory_example", 
            appName: 'mongosh+2.2.12'
        }
        return mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected')
            return mongoose
        })
    } catch (e) {
        throw e
    }
}

export default dbConnect