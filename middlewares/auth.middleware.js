const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../key');

if (typeof localStorage === "undefined" || localStorage === null) {
    const LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
};

module.exports.checkToken = (req, res, next) => {
    try {
        const token = localStorage.getItem('token');
            jwt.verify(token, secretKey, (err, payload) => {
                if (payload) {
                    req.user = payload;
                    res.locals.user = payload;
                    next();
                } else {
                    res.redirect('/auth/login');
                }
            })
    } catch (err) {
        res.status(401).send('No token provided');
    }  
};

module.exports.protectedRoute = (req, res, next) => {
    if (req.user) {
        return next();
    };
};