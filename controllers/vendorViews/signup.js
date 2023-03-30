import { errorLog } from "../../utils/logs.js";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";
import { vendorModel } from "../../schema/vendorSchema.js";

export const SignupView = (req, res) => {
  try {
    if (EmailValidator.validate(req.body.email)) {
      vendorModel
        .findOne({ email: req.body.email })
        .then(async (queryResult) => {
          if (!queryResult || !Object.keys(queryResult).length) {
            const newUser = vendorModel(req.body);
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            newUser
              .save()
              .then((data) => {
                res.status(201).send({ message: "User created" });
              })
              .catch((error) => {
                res.status(400).send({ message: "Invalid data" });
              });
          } else {
            res.status(403).send({ message: "Email already exist" });
          }
        })
        .catch((error) => {
          errorLog(error);
        });
    } else {
      res.status(403).send({ message: "Invalid email" });
    }
  } catch (error) {
    errorLog(error);
  }
};
