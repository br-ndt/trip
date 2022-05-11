import express from "express"
import { Review, Vote, User } from "../../../models/index.js"

const reviewVotesRouter = new express.Router()

reviewVotesRouter.get("/:id", async (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default reviewVotesRouter













// get to get score of review, put to post & update review score from user input
// add route to rootRouter

