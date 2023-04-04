import pkg from "express";
//views
import { addProduct } from "../controllers/vendorViews/addProduct.js";
import { loginView } from "../controllers/vendorViews/login.js";
import { SignupView } from "../controllers/vendorViews/signup.js";
//jwt auth
import { authenticateJwtToken } from "../utils/jwtUtils.js";
import { tryCatch } from "../utils/errorHandlers.js";

const vendorRoutes = pkg.Router();
const protectedRoutes = pkg.Router();
//routes
vendorRoutes.post("/signup", tryCatch(SignupView));
vendorRoutes.post("/login", tryCatch(loginView));
//protected routes
vendorRoutes.use("/app", authenticateJwtToken, protectedRoutes);
protectedRoutes.post("/add_product", tryCatch(addProduct));

export default vendorRoutes;
