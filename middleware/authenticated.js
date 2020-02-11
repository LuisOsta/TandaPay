const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = mongoose.model("users");

/**
 * @summary - It will retrieve the auth token cookie from the request.
 * It will then process the token to check for validity and forward the user to the route controller if it is. Otherwise it will respond with a 401 Error.
 * @param {token} req - It will receive the auth token through a cookie.
 * The token and user object will be defined in the request object if the user is authenticated
 * @param res - Will be unchanged if the user is authenticated, the request will be forwarded to the route controllers.
 * @param next - Express callback function that will forward the route to the next controller
 * @todo add WWWW-Authenticate Header as specified by the RFC
 */
const authenticated = (req, res, next) => {
    const token = req.cookies["x-auth"];
    if (!token) {
        return res.status(401).send({
            error: "User must be logged in",
        });
    }
    User.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject();
            }
            req.user = user;
            req.token = token;
            next();
        })
        .catch(e => {
            return res.status(401).send({
                error: "Invalid credentials provided. Acquire new credentials.",
            });
        });
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkSignature = (req, res, next) => {
    const token = req.cookies["x-auth"];
    try {
        const decoded = jwt.verify(token, keys.jwtSecret);
        req.body = decoded;
        req.token = token;
        next();
    } catch (error) {
        res.cookie("x-auth", "", { maxAge: Date.now() });
        return res.status(401).send({ error: "Invalid auth token" });
    }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkWhiteList = (req, res, next) => {
    const token = req.token;
    User.findByToken(token)
        .then(user => {
            if (!user) {
                res.cookie("x-auth", "", { maxAge: Date.now() });
                return Promise.reject();
            }
            req.user = user;
            next();
        })
        .catch(e => {
            res.cookie("x-auth", "", { maxAge: Date.now() });
            return res.status(401).send({
                error: "Invalid credentials provided. Acquire new credentials.",
            });
        });
};

module.exports = {
    authenticated,
    checkSignature,
    checkWhiteList,
};
