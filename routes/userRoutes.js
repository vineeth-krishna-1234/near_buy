import pkg from "express";

//views
import { SignupView } from "../controllers/userViews/signup.js";
import { searchView } from "../controllers/userViews/search.js";
import { loginView } from "../controllers/userViews/login.js";
//jwt auth
import { authenticateJwtToken } from "../utils/jwtUtils.js";

const userRoutes = pkg.Router();
const protectedRoutes = pkg.Router();

//routes
userRoutes.post("/signup", SignupView);
userRoutes.post("/login", loginView);
//protected route
userRoutes.use("/auth", authenticateJwtToken, protectedRoutes);
protectedRoutes.get("/search", authenticateJwtToken, searchView);
export default userRoutes;
