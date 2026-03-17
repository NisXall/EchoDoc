import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) throw new Error('please define MONGODB_URI');

declare global {
    var mongooseCache: {
        conn : typeof mongoose | null
        promise : Promise<typeof mongoose> | null
    }
}

let cached = global.mongooseCache || (global.mongooseCache = {conn : null, promise : null});

export const connectToDatabase = async() => {
    if(cached.conn) return cached.conn;

    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands:false});
    }
    try{
        cached.conn = await cached.promise;
    }catch(err){
        cached.promise = null;
        console.error("MongoDB connection error" + err);
        throw err;
    }
    console.info("connected to MongoDB");
    return cached.conn;
}

