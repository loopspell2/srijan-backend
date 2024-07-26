
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    
    
    try {
        const token = req.header('token') || req.cookies?.token;
        if (!token) {
            return res.status(401).send('Unauthorized: No token provided');
        }
        const decode = await jwt.verify(token, "secret");
        req.user = decode.user;
        next();
    }
    catch (err) {
        res.status(401).send('Unauthorized: Invalid token');
    }
};

module.exports = auth;