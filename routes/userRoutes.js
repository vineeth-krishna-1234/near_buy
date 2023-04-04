import pkg from "express";

//views
import { SignupView } from "../controllers/userViews/signup.js";
import { searchView } from "../controllers/userViews/search.js";
import { loginView } from "../controllers/userViews/login.js";
import { nearbyVendors } from "../controllers/userViews/nearbyVendors.js";

//jwt auth
import { authenticateJwtToken } from "../utils/jwtUtils.js";

const userRoutes = pkg.Router();
const protectedRoutes = pkg.Router();

//routes
userRoutes.post("/signup", SignupView);
userRoutes.post("/login", loginView);
//protected route
userRoutes.use("/auth", authenticateJwtToken, protectedRoutes);
protectedRoutes.get("/search", searchView);
protectedRoutes.post("/nearby_vendors", nearbyVendors);

export default userRoutes;
