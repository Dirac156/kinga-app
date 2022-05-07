// import npm modules first
import { Hasher, VerifyHash } from "../libraries/bcrypt.js";
// import other functiuons
import { userModel } from "../models/user.model.js";

class User {

    // add a user into the database
    static async createUser(userData) {
        const { email, password } = userData;
        const promise = new Promise( async (resolve, reject) => {
            const user = await userModel.findOne({ email }).exec();
            if ( user ) reject({ status: false, message: "user already exist."})
            else {
                const createHash = await Hasher(password);
                if (createHash.status) {
                    const createdUser = userModel.create({ 
                        ...userData,
                        email, 
                        password: createHash.payload 
                    });
                    resolve(createdUser);
                } else {
                    throw createHash.payload
                }
            }
        });

        return promise;
    }

    static async login(email, password) {
        //TODO: implement login
        const promise = new Promise( async (resolve, reject) => {
            const user = await userModel.findOne({ email });
            // user does not exist
            if ( !user ) reject(user); 
            const match = await VerifyHash(password, user.password);
    
            if (match.status) {
                // user exist and has a valid or incorrect password 
                match.payload ? 
                resolve({ status: true, payload: user }) : 
                resolve({ status: false });
            } else 
                reject( match.payload )
        });

        return promise;
    }


    static logout() {
        const promise = new Promise((resolve, reject) => {
            //TODO: implement logout
        });

        return promise;
    }

    static findUserById (userId) {
        return userModel.findById(userId);
    }
}

export default User;