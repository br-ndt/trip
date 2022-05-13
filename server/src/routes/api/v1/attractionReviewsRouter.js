import express from "express";
import { ValidationError } from "objection";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { Review } from "../../../models/index.js";
import ReviewSerializer from "../../../serializers/ReviewSerializer.js";

const attractionReviewsRouter = new express.Router({ mergeParams: true });

attractionReviewsRouter.post("/", async (req, res) => {
  const { title, content, rating } = cleanUserInput(req.body);
  const { attractionId } = req.params;
  const userId = req.user.id;

  try {
    const newReview = await Review.query().insertAndFetch({ title, content, rating, attractionId, userId });
    await newReview.$relatedQuery("votes").insert({ userId, reviewId: newReview.id, score: 1 });
    const serializedReview = await ReviewSerializer.getSummary(newReview);
    return res.status(201).json({ review: serializedReview });
  } catch (error) {
    if(error instanceof ValidationError) {
      return res.status(422).json({ errors: error });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
})

export default attractionReviewsRouter;
