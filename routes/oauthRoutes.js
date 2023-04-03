import pkg from "express";
import { Passport } from "passport/lib";
const oauthRoutes = pkg.Router();

oauthRoutes.get(
  "/google",
  Passport.authenticate("google", { scope: ["profile"] })
);

oauthRoutes.get(
  "/google/callback",
  Passport.authenticate("google", { failureRedirect: "/auth/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);
export default oauthRoutes;
