import express from "express";
import { Location } from "../../../models/index.js";
import LocationSerializer from "../../../serializers/LocationSerializer.js";

const locationsRouter = express.Router();

locationsRouter.get("/", async (req, res) => {
  try {
    const locations = await Location.query();
    const serializedLocations = await Promise.all(
      locations.map(async (location) => await LocationSerializer.getSummary(location))
    );
    res.status(200).json({ locations: serializedLocations });
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

locationsRouter.get("/:id", async (req, res) => {
  try {
    const location = await Location.query().findById(req.params.id);
    const serializedLocation = await LocationSerializer.getDetails(location);
    return res.status(200).json({ location: serializedLocation });
  } catch(error) {
    console.error(error);
    return res.status(500).json({ errors: error });
  }
})

export default locationsRouter;
