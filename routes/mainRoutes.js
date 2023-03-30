import pkg from "express";

//sub routes
import userRoutes from "./userRoutes.js";
import vendorRoutes from "./vendorRoutes.js";

const mainRoutes = pkg.Router();
mainRoutes.use("/user", userRoutes);
mainRoutes.use("/vendor", vendorRoutes);

export default mainRoutes;
