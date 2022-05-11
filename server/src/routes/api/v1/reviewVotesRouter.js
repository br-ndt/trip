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





