import bcrypt from  "bcrypt";

const saltRounds = 10;

export const Hasher = async (plainText) => {
    try{
        const salt = await bcrypt.genSalt(saltRounds);
        const hashed = await bcrypt.hash(plainText, salt);
        return { status: true, payload: hashed }
    } catch(err) {
        console.log("Could not hash text: ", err);
        return { status: false, payload: err }
    }
}


export const VerifyHash = async (plainText, hashedText) => {
    try{
        const match = await bcrypt.compare(plainText, hashedText);
        return { status: true, payload: match }
    }catch(err){
        console.log("Could not verify text: ", err);
        return { status: false, payload: err }
    }
}