//
import { Router } from "express";
//
import Session from "../services/session.service.js";
import User from "../services/user.service.js";
import { http } from "../helpers/http.js";

const userRouters = Router();

// register a new user
userRouters.post("/user/register", async function(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.createUser({ ...req.body });
        if (user) {
            res.status(http.status.created)
            res.json({ status: true, message: "User created.", data: user});
        } else {
            res.status(http.status.badRequest)
            res.json({ status: false, message: "User could not be created."});
        }
    }catch(err) {
        const message = err.message;
        console.error("Internal Server Error.", err);
        res.status(http.status.serverError);
        res.json({ status: false, message });
    }
});

// login a user
userRouters.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.login(email, password);
        if ( user.status ) {
            const now = new Date();
            const expiresAt = new Date(+now + 120 * 1000); 
            const sessionToken = await Session.createSession(user.payload._id);
            if ( !sessionToken ) {
                throw { status: false, message: "User not logged in."}
            }
            res.cookie("session_token", sessionToken, { expires: expiresAt })
            res.status(http.status.ok)
            res.json({ ...user, session: sessionToken.token, message: "User loged in."});
        } else {
            res.status(http.status.badRequest)
            res.json({ status: false, message: "User not loged in."});
        }
    }catch(err) {
        console.error("Internal Server Error.", err);
        res.status(http.status.serverError);
        res.json({ status: false, message: "Something went wrong"});
    }
});

userRouters.get("/user/refresh", async (_, res) => {
    try{
        const { token } = _.query;
        const isActive = await Session.isActive(token);
        res.status(http.status.ok).json({ ...isActive })
    }catch(err) {
        console.error("Internal Server Error.", err);
        res.status(http.status.serverError);
        res.json({ status: false, message: "Something went wrong"});
    }
})

// logout a user
userRouters.post("/user/logout", async (req, res) => {
    try {
        const token = req.params;
        const logout = await Session.deleteSession(token);
        if (logout){
            res.status(http.status.ok);
            res.json({ status: true, message: "User loged out."});
        } else {
            res.status(http.status.badRequest);
            res.json({ status: false, message: "User was not loged out."});
        }
    }catch(err) {
        console.error("Internal Server Error.", err);
        res.status(http.status.serverError);
        res.json({ status: false, message: "Something went wrong"});
    }
});


export default userRouters;