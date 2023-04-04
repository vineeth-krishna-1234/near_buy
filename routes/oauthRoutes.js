import pkg from "express";
import passport from "passport";
const oauthRoutes = pkg.Router();


oauthRoutes.get('/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

oauthRoutes.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

export default oauthRoutes;
