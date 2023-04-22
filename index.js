//mongodb connection
import { mongooseConnection } from "./database/mongo.js";
import { statusLog } from "./utils/logs.js";
//middleware
import bodyParser from "body-parser";
import cors from "cors";
import pkg from "express";
import * as dotenv from "dotenv";
dotenv.config;
import { errorHandler } from "./utils/errorHandler.js";
//route import
import routes from "./routes/mainRoutes.js";

//cloud connections
mongooseConnection();

const app = pkg();
app.use(cors({ credentials: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use("", routes);
app.use(errorHandler)
app.listen(process.env.PORT || 3000, () => {
  statusLog(`server is listing at ${process.env.PORT}`);
});
