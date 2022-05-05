import express from "express";
import objection from "objection"
import { Attraction } from "../../../models/index.js";

const attractionsRouter = new express.Router();

attractionsRouter.get("/", async (req, res) => {
  try {
    const attractions = await Attraction.query();
    return res.status(200).json({ attractions });
  } catch (error) {
    return res.status(500).json({ error });
  }
});

attractionsRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const attraction = await Attraction.query().findById(id)
    attraction.reviews = await attraction.$relatedQuery("reviews")
    return res.status(200).json({ attraction })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ errors: error })
  }
})

export default attractionsRouter; 