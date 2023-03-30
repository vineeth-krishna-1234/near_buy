import { productModel } from "../../schema/productSchema.js";
import { vendorModel } from "../../schema/vendorSchema.js";
import { errorLog } from "../../utils/logs.js";

export const addProduct = (req, res) => {
  try {
    if (!req.email) {
      res.status(403).send({ message: "Invalid user" });
    }
    vendorModel
      .findOne({ email: req.email })
      .then((queryResult) => {
        if (!queryResult) {
          res.status(403).send({ message: "Invalid user" });
        } else {
          const newProduct = productModel(req.body);
          newProduct.shopId = queryResult._id;
          newProduct
            .save()
            .then((savedProduct) => {
              vendorModel
                .updateOne(
                  { _id: queryResult._id },
                  { $push: { products: savedProduct._id } }
                )
                .catch((error) => {
                  errorLog(error);
                  res.sendStatus(403);
                });
            })
            .catch((error) => {
              errorLog(error);
              res.status(403).send({ message: "Invalid product info" });
            });
          res.status(201).send({ message: "product Created" });
        }
      })
      .catch((error) => {
        errorLog(error);
        res.status(403).send({ message: "Invalid user" });
      });
  } catch {
    res.sendStatus(500);
  }
};
