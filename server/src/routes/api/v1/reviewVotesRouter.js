import express from "express";
import { Review, Vote, User } from "../../../models/index.js";

const reviewVotesRouter = new express.Router({ mergeParams: true });

reviewVotesRouter.put("/:voteId", async (req, res) => {
  const { voteVal } = req.body;
  const { voteId } = req.params;
  const reviewId = req.params.id;

  try {
    if (req.user) {
      let newVote;
      const parsedVoteId = parseInt(voteId);
      if (parsedVoteId) {
        const vote = await Vote.query().findById(parsedVoteId);
        if (vote.score === voteVal) {
          newVote = await vote.$query().patchAndFetch({ score: 0 });
        } else {
          newVote = await vote.$query().patchAndFetch({ score: voteVal });
        }
      } else {
        newVote = await Vote.query().insertAndFetch({ reviewId, userId: req.user.id, score: voteVal });
      }
      res.status(200).json({ vote: newVote });
    } else {
      res
        .status(401)
        .json({ "AuthorizationError:": "User not authorized to delete review" });
    }
  } catch (error) {
    res.status(500).json({ errors: error });
  }
});

export default reviewVotesRouter;
