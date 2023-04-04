import * as dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { userModels } from "../schema/userModel.js";

dotenv.config();

export const initializePassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:9000/auth/google/callback",
        passReqToCallback: true,
      },
      async (request, accessToken, refreshToken, profile, done) => {
        //get the user data from google and redirect
        console.log(accessToken,refreshToken)
        try {
          //find the user in our database
          let user = await userModels.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            
            // if user is not preset redirect the user to next page and get the requires details and save user data to database.
            
            done(null, true);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, true);
  });

  passport.deserializeUser(async (id, done) => {
    done(null,true)
  });
};
