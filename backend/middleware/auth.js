// const session = require('express-session');
const  jwt  = require('jsonwebtoken');
const auth = (req, res, next) => {
    console.log(req.body);
    const token = req.headers["x-access-token"]
    if (token && req.session.user) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.json({isLoggedIn: false, message: "Failed To Authenticate"})
        //    console.log(decoded);
            req.user = {};
            req.user.id = decoded.id
            req.user.email = decoded.email
            req.user.name = decoded.name
            next()
        })
    } else {
        req.session.destroy((err) => {
            //delete session data, using sessionID in cookie
            if (err) throw err;
            res.clearCookie("secret"); // clears cookie containing expired sessionID
        
           return res.status(200).send({ message: "Logged out successfully." });
          });
    }
}
module.exports = auth;