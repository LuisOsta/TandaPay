const keys = require("../config/keys");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const { displayName, emails, photos, id } = profile;
      const userEmail = emails[0].value;
      const userPicture = photos[0].value;

      return done(null, {
        name: displayName,
        email: userEmail,
        picture: userPicture,
        googleID: id
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"]
    },
    async (accessToken, refreshToken, profile, done) => {
      const { displayName, emails, id, photos } = profile;
      const userEmail = emails[0].value;
      return done(null, {
        name: displayName,
        email: userEmail,
        facebookID: id
      });
    }
  )
);
