import { errorLog } from "../../utils/logs.js";
import { userModel } from "../../schema/userSchema.js";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
import { createJwtToken } from "../../utils/jwtUtils.js";

export const loginView = (req, res) => {
  try {
    if (EmailValidator.validate(req.body.email)) {
      userModel.findOne({ email: req.body.email }).then((queryResults) => {
        if (!queryResults) {
          res.status(404).send({ message: "Email not found" });
        } else {
          bcrypt
            .compare(req.body.password, queryResults.password)
            .then(function (result) {
              if (result) {
                const token = createJwtToken({
                  email: req.body.email,
                });
                res.status(200).send({
                  message: "success",
                  authToken: token,
                });
              } else {
                res.status(401).send({
                  message: "Password does not match",
                });
              }
            })
            .catch((error) => {
              errorLog(error);
            });
        }
      });
    } else {
      res.status(400).send({ message: "Invalid Email" });
    }
  } catch (error) {
    errorLog(error);
    res.status(500).send({ message: "Unknown error occurred" });
  }
};
