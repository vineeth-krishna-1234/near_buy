//node
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
//db models
import { userModel } from "../../schema/userSchema.js";
//utils
import { createJwtToken } from "../../utils/jwtUtils.js";
import { errorLog } from "../../utils/logs.js";


export const loginView = (req, res) => {
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
              res.status(200).send({ message: "success", authToken: token });
            } else {
              res.status(401).send({ message: "Password does not match" });
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
};
