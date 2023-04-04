import pkg from "express";

//sub routes
import userRoutes from "./userRoutes.js";
import vendorRoutes from "./vendorRoutes.js";
import oauthRoutes from "./oauthRoutes.js";

const mainRoutes = pkg.Router();
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/vendor", vendorRoutes);
mainRoutes.use("/auth",oauthRoutes)
export default mainRoutes;
