const express = require("express");
const passport = require("passport");

const {
    authenticated,
    checkSignature,
    checkWhiteList,
} = require("../middleware/authenticated");

const {
    oauthController,
    generateToken,
    sendCookie,
    checkCredentials,
    createUser,
    logOut,
    userDoesExist,
    userDoesNotExist,
} = require("../controller/authController");
let router = express.Router();

/**
 * @summary - PassportJS base route for 0auth 2.0 Google Login
 */
router.get(
    "/google",
    passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"],
    })
);

/**
 * @summary - PassportJS callback for 0auth 2.0 Google Login
 * @callback
 * @param {Object} token
 * @returns the cookie with the token and redirects the user back to the application
 */
router.get(
    "/google/callback",
    passport.authenticate("google", { session: false, failureRedirect: "/" }),
    oauthController,
    sendCookie
);
/**
 * @summary - PassportJS base route for 0auth 2.0 Facebook Login
 */
router.get(
    "/facebook",
    passport.authenticate("facebook", {
        session: false,
        scope: ["email"],
    })
);

/**
 * @summary PassportJS callback for 0uth 2.0 Facebook Login
 */
router.get(
    "/facebook/callback",
    passport.authenticate("facebook", {
        session: false,
        failureRedirect: "/",
    }),
    oauthController,
    sendCookie
);

/**
 * @summary It allows a user to create a new account, associated with an email and password.
 * The route will check the credentails and the uniqueness of the account. If it passes both of those checks it will then create the account and generate a new auth token for it.
 * Finally, it will set the auth token as a cookie to the header and respond with the user object
 */
router.post(
    "/signup",
    checkCredentials,
    userDoesNotExist,
    createUser,
    generateToken,
    sendCookie
);

/**
 * @summary It allows the user to log in to their existing account associated with an email and password.
 * It will check the credentails provided and if a user associated with those credentials exists.
 * Finally, it will generate a new auth token, set as a cookie header and respond with the user object.
 */
router.post(
    "/login",
    checkCredentials,
    userDoesExist,
    generateToken,
    sendCookie
);

/**
 * @summary checks the signature for validity and the whitelist of auth tokens to assure the user is authenticated.
 * Then removes the token from the DB and cookie header.
 * @param token
 */
router.post("/logout", checkSignature, authenticated, logOut);

/**
 * @summary retrieves the absolute basic user information.
 * It will will only check for the validity of the token information
 * @param {Object} token - the encoded token received and validated
 * @param {Object} user - the decoded user information from the token
 */

router.get("/me", checkSignature, checkWhiteList, (req, res) => {
    const user = req.user;
    res.status(200).send(user);
});

module.exports = router;
