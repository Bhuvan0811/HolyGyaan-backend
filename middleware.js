const JWT_secret = require("./config");
const jwt = require("jsonwebtoken");
const authMiddleware = function(req, res, next){

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            msg: "Authorization Token incorrect"
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_secret);
        req.userId = decoded.user._id;
        next();
    } catch (err) {
        res.status(403).json({
            msg: "Token invalidated"
        })
        return;
    }
}

module.exports = {
    authMiddleware
}