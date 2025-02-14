import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js"

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret:  process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    }, 
    async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(profile);
        } catch (error) {
            
        }
    }
)
)


export default passport;