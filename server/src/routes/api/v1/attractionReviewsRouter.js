import express from "express";

import { Review } from "../../../models/index.js";

const attractionReviewsRouter = new express.Router({ mergeParams: true });

attractionReviewsRouter.post("/", async (req, res) => {
  const { title, content, rating, userId } = req.body;
  const { attractionId } = req.params;

  try {
    const newReview = await Review.query().insertAndFetch({ title, content, rating, attractionId, userId });
    return res.status(201).json({ review: newReview });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
})

export default attractionReviewsRouter;
