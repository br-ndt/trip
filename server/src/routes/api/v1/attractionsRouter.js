import express from "express";
import { Attraction } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
const attractionsRouter = new express.Router();

attractionsRouter.get("/", async (req, res) => {
  try {
    const attractions = await Attraction.query();
    return res.status(200).json({ attractions });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
});

attractionsRouter.post("/", async (req, res) => {
  const { name, description } = cleanUserInput(req.body);
  try {
    const newAttraction = await Attraction.query().insertAndFetch({ name, description });
    return res.status(200).json({ attraction: newAttraction });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default attractionsRouter;
