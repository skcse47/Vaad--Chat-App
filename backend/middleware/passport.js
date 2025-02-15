import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js"
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL, // Ensure this is correct in Google Console
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let email = profile.emails[0].value;
                let username = email.split("@")[0]; // Create a username from email
                let user = await User.findOne({ username });

                if (!user) {
                    // Hash email (as password)
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(username, salt);

                    // Create new user
                    user = new User({
                        fullname: profile.displayName,
                        username,
                        password: hashedPassword, // Store hashed email as password
                        profilePic: profile.photos[0].value,
                        gender: "male",
                    });

                    await user.save();
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});
  

export default passport;