import express from "express";
import { Attraction } from "../../../models/index.js";
import AttractionSerializer from "../../../serializers/AttractionSerializer.js";
import attractionReviewsRouter from "./attractionReviewsRouter.js";

const attractionsRouter = new express.Router();

attractionsRouter.use("/:attractionId/reviews", attractionReviewsRouter);

attractionsRouter.get("/", async (req, res) => {
  try {
    const attractions = await Attraction.query();
    const serializedAttractions = await Promise.all(
      attractions.map(async attraction => await AttractionSerializer.getSummary(attraction))
    );
    return res.status(200).json({ attractions: serializedAttractions });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

attractionsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const attraction = await Attraction.query().findById(id);
    attraction.reviews = await attraction.$relatedQuery("reviews");
    return res.status(200).json({ attraction });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

export default attractionsRouter;
