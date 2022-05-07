import mongoose from "mongoose";
import { dbConfig } from "./config.js";

const { db, dbUser, dbPassWord, dbHost } = dbConfig;

// connect to mongodb database.
export const connectToDb = () => {
    const promise = new Promise( async (resolve, reject) => {
        try {
            const uri = `mongodb+srv://${dbUser}:${dbPassWord}@${dbHost}/${db}?retryWrites=true&w=majority`;
            const connection = await mongoose.connect(uri);
            resolve({ status: true, connection: connection});
        }catch(err) {
            // default pass status, message and data.
            reject({ status: false, message: "Connection to database failed", error: err});
        }
    })
    return promise;
}