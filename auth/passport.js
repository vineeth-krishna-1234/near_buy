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
        //get the user data from google
        console.log(accessToken,refreshToken)
        try {
          //find the user in our database
          let user = await userModels.findOne({ googleId: profile.id });

          if (user) {
            //If user present in our database.
            done(null, user);
          } else {
            console.log(profile);
            const newUser = {
              googleId: profile.id,
              displayName: profile.displayName,
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              image: profile.photos[0].value,
              email: profile.emails[0].value,
            };
            // if user is not preset in our database save user data to database.
            user = await userModels.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    let a = await userModels.findById(id);
    done(null,a)
  });
};
