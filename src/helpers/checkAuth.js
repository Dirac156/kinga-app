import Session from "../services/session.service";

export const verifyAuth = (req, res, next) => {
    try{
        // verify if they are no cookies
        if ( !req.cookies ) {
            res.status(401);
            res.send({ status: false, message: "Unauthorized user"});
            return
        } 
        
        // verify if the session is still valid
        const sessionToken = req.cookies['session_token'];
        // check if token is not yet expired
        const isActive = Session.isActive(sessionToken);
    
        if ( !sessionToken || !isActive.status ) {
            res.status(401);
            res.send({ status: false, message: "Unauthorized user"});
            return
        }
        
        next();
    }catch(err) {
        res.status(500);
        res.end();
        return
    }
}
