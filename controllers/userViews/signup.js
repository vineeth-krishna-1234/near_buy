import { errorLog } from "../../utils/logs.js";
import { userModel } from "../../schema/userSchema.js";
import * as EmailValidator from "email-validator";
import bcrypt from "bcrypt";

export const SignupView = (req, res) => {
  console.log(req.body);
  try {
    if (EmailValidator.validate(req.body.email)) {
      userModel
        .findOne({ email: req.body.email })
        .then(async (queryResult) => {
          if (!queryResult || !Object.keys(queryResult).length) {
            const newUser = userModel(req.body);
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            newUser
              .save()
              .then((data) => {
                res.status(201).send({
                  message: "User created",
                });
              })
              .catch((error) => {
                res.status(400).send({
                  message: "Invalid data",
                });
              });
          } else {
            res.status(403).send({
              message: "Email already exist",
            });
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
