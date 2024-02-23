const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/google/callback",
    passReqToCallback: true
  },
  // If you want to use other google services use the accessToken and refreshToken
  (request, accessToken, refreshToken, profile, done) => {
    done(null, profile)
  }
));

// serialization and deserialization of users
passport.serializeUser((user,done) => {
    done(null, user);
})

passport.deserializeUser ((user,done) => {
    done(null, user);
})