const jwt = require("jsonwebtoken");

module.exports.authenticate = (req, res, next) => { //this functions takes 3 parameters: request, response and next.
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
        if (err) { 
        res.status(401).json({verified: false});
        } else {
            next();
        }
    });
}