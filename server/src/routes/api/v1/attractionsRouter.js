import express from "express";
import { Attraction } from "../../../models/index.js";
import AttractionSerializer from "../../../serializers/AttractionSerializer.js";

const attractionsRouter = new express.Router();

attractionsRouter.get("/", async (req, res) => {
  try {
    const attractions = await Attraction.query();
    const serializedAttractions = await Promise.all(
      attractions.map(async attraction => await AttractionSerializer.getSummary(attraction))
    );
    return res.status(200).json({ attractions: serializedAttractions });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

export default attractionsRouter;