import mongoose from "mongoose";


export const connectToDB = () => {
    mongoose.connect(process.env.DB_URI as string, );
    mongoose.connection.on('connected', () => {
        console.log('db connection established 😀')
    });

    mongoose.connection.on('error', (error) => {
        console.error(error);
    });
}