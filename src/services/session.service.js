import { sessionModel } from "../models/session.model.js";




class Session {

    static async createSession(userId) {
        const now = new Date();
        const expiresAt = new Date(+now + 120 * 1000);
        return sessionModel.create({ userId, expiresAt });
    }

    static async isActive(token) {
        const now = new Date();
        const session = await sessionModel.findOne({ token });
        if (!session) return { status: false, message: "Session does not exist" };
        if (session.expiresAt > now) {
            return { status: true, message: "session is not yet expired.", token, expiresAt: session.expiresAt }
        } else {
            await sessionModel.findByIdAndRemove(session._id);
            return { status: false, message: "Session already expired."}
        }
    }
} 

export default Session;