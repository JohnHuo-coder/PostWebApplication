
import { verifyUserToken } from "../utils/authUtils.js"


export const checkAuth = async (req, res, next) => {

    const accessToken = req.cookies["my-access-token"];
    if (!accessToken){
        return res.status(401).json({ error: "Authentication Required, please log in first"})
    }
    try{
        const user = await verifyUserToken(accessToken); // defined elsewhere
        if (!user) {
            res.clearCookie("my-access-token");
            res.clearCookie("my-refresh-token");
            return res.status(401).json({ error: 'Unauthorized: Invalid or expired token. Please sign in again.' });
        }
        req.accessToken = accessToken;
        req.user = user; // attach user info to the request object
        next(); // user is authenticated, proceed
    }catch(e){
        console.error("Auth Middleware Error:", e);
        res.status(500).json({ error: "Internal server error during authentication check." });
    }
};

export const checkAdmin = (req, res, next) => {
 // this middleware MUST run *after* checkAuth
 if (req.user && req.user.role === 'admin') {
   next(); // they are an admin, proceed
 } else {
   res.status(403).json({ error: 'Forbidden: Admin access required' });
 }
};
