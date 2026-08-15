import mongoose from 'mongoose'

function getMongoUri() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not configured')
  return uri
}

type MongooseCache = { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null }

declare global {
  var mongooseCache: MongooseCache | undefined
}

const cache = global.mongooseCache ?? { conn: null, promise: null }
global.mongooseCache = cache

export async function connectToDatabase() {
  if (cache.conn) return cache.conn
  if (!cache.promise) {
    cache.promise = mongoose.connect(getMongoUri(), { bufferCommands: false })
  }
  cache.conn = await cache.promise
  return cache.conn
}
