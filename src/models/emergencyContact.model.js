import mongoose from "mongoose";

const emergencyContactSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    contacts: {
        type: [],
        require: false
    }
}, {
    timestamps:true   
});

const emergencyContactModel = mongoose.model("emergencyContacts", emergencyContactSchema)