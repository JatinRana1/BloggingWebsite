import mongoose from "mongoose";
export const connectServer = async () => {
    try{
        const mongodb_uri = process.env.MONGO_URI;
        if(!mongodb_uri){
            throw Error('mongodb_uri not defined in dotenv');
        }
        await mongoose.connect(mongodb_uri);
        console.log('connected to the mongodb');
    }catch(error){
        console.error('Failed to connect with mongodb: ', error)
    }
}
