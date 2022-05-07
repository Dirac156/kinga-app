import mongoose from "mongoose";
import { v4 } from "uuid";

import { deleteOldDocument } from "../helpers/mongoose.js";

const sessionSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    token: {
        type: String,
        require: true,
        default: v4
    },
    expiresAt: {
        type: Date,
        required: "The date is required"
    }, 
}, {
    timestamps:true   
});



export const sessionModel = mongoose.model('session', sessionSchema);

const date = new Date();
deleteOldDocument(sessionModel, date);