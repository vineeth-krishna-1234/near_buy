import pkg from "express";

//views
import { SignupView } from "../controllers/userViews/signup.js";
import { searchView } from "../controllers/userViews/search.js";
import { loginView } from "../controllers/userViews/login.js";
//jwt auth
import { authenticateJwtToken } from "../utils/jwtUtils.js";
import { tryCatch } from "../utils/errorHandler.js";
const userRoutes = pkg.Router();
const protectedRoutes = pkg.Router();

//routes
userRoutes.post("/signup", tryCatch(SignupView));
userRoutes.post("/login", tryCatch(loginView));
//protected route
userRoutes.use("/auth", authenticateJwtToken,protectedRoutes);
protectedRoutes.get("/search", authenticateJwtToken, tryCatch(searchView));
export default userRoutes;
