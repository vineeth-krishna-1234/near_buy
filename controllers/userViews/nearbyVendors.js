import { vendorModel } from "../../schema/vendorSchema.js";

export const nearbyVendors = (req, res) => {
  const secondarySchema = req.body;
  const reqDistance = req.body.distance;
  const reqLocation = [11, 75];
  delete secondarySchema.distance;
  vendorModel
    .find(
      {
        location: {
          $geoWithin: {
            $center: [reqLocation, reqDistance ? reqDistance : 10],
          },
        },
        ...secondarySchema,
      },
      {
        vendorName: 1,
        shopName: 1,
        address: 1,
        email: 1,
        phoneNumber: 1,
        imageUrl: 1,
        rating: 1,
        doorDelivery: 1,
        _id: 1,
      }
    )
    .then((queryResults) => {
      res.status(200).send(queryResults);
    });
};
