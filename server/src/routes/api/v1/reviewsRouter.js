import express from 'express'
import { Review } from "../../../models/index.js"

const reviewsRouter = new express.Router()

reviewsRouter.delete("/:id", async (req, res) => {
  try {
    const reviewToDelete = await Review.query().findById(req.params.id)
    if (reviewToDelete.userId === req.user.id) {
      await Review.query().deleteById(req.params.id)
      res.status(200).json({ message: "This review was successfully deleted" })
    } else {
      res.status(401).json({ message: "User not authorized to delete review" })
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
})

export default reviewsRouter