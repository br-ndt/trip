import { Vote } from "../../models/index.js";

class VoteSeeder {
  static async seed() {
    const votesData = [
      {
        userId: 1,
        reviewId: 1,
        score: 1
      },
      {
        userId: 2,
        reviewId: 2,
        score: -1
      },
      {
        userId: 1,
        reviewId: 1,
        score: -1
      },
    ];
    for (const singleVoteData of votesData) {
      const currentVote = await Vote.query().findOne(singleVoteData);
      if (!currentVote) {
        await Vote.query().insert(singleVoteData);
      }
    }
  }
}

export default VoteSeeder;
