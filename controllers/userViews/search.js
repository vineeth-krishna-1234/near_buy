
import { vendorModel } from "../../schema/vendorSchema.js";
export const searchView = async (req, res) => {
  const data = await vendorModel
    .find({
      "startPoint": {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [11, 76.02] },
          // $distanceField: "dist.calculated",
          
          $maxDistance: 4000,
        },
      },
    })
    .then((result) => {

      res.send(result);
    });

};

