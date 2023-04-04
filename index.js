//mongodb connection
import { mongooseConnection } from "./database/mongo.js";
import { statusLog } from "./utils/logs.js";
//middleware
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "express";
import * as dotenv from "dotenv";
import { initializePassport } from "./auth/passport.js";
import passport from "passport";
import session from "express-session";
dotenv.config();
//route import
import routes from "./routes/mainRoutes.js";
//cloud connections
mongooseConnection();
initializePassport();

const app = pkg();
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
  })
)
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("", routes);

app.listen(process.env.PORT || 3000, () => {
  statusLog(`server is listening at ${process.env.PORT}`);
});
