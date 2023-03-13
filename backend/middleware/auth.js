const session = require('express-session');
const  jwt  = require('jsonwebtoken');
const auth = (req, res, next) => {
    const token = req.headers["x-access-token"]
    console.log(req.session.user);
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
        res.json({message: "Incorrect Token Given", isLoggedIn: false})
    }
}
module.exports = auth;