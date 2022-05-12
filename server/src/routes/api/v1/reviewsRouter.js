import express from "express";
import { Review } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";

const reviewsRouter = new express.Router();

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const reviewToDelete = await Review.query().findById(req.params.id);
    if (req.user && reviewToDelete.userId === req.user.id) {
      await Review.query().deleteById(req.params.id);
      res.status(200).json({ message: "This review was successfully deleted" });
    } else {
      res
        .status(401)
        .json({ "AuthorizationError:": "User not authorized to delete review" });
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

reviewsRouter.patch("/:id", async (req, res) => {
  const { content } = req.body;
  const { title, rating } = cleanUserInput(req.body);

  try {
    if (!title || !rating) {
      return res.status(422).json({ "Error:": "Both title and rating must have values" });
    }

    const reviewToEdit = await Review.query().findById(req.params.id);
    if (reviewToEdit.userId === req.user.id) {
      const updatedReview = await Review.query().patchAndFetchById(req.params.id, {
        title,
        content,
        rating,
      });
      res.status(200).json({ review: updatedReview });
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error });
    } else {
      return res.status(500).json({ errors: error });
    }
  }
});

export default reviewsRouter;
