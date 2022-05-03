import express from "express";
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

export default attractionsRouter;