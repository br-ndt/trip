import express from 'express'
import { Review } from "../../../models/index.js"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    await Review.query().deleteById(req.params.id)
    res.status(200).json({ message: "This review was successfully deleted" })
  } catch (error) {
    res.status(500).json({ errors: error });
  }
})

export default reviewsRouter