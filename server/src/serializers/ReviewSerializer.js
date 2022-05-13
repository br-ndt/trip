import VoteSerializer from "./VoteSerializer.js";

class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "title", "rating", "content", "userId"];
    let serializedReview = {};
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute];
    }
    serializedReview.user = await review.$relatedQuery("user").email;
    const votes = await review.$relatedQuery("votes");
    serializedReview.totalScore = 0;
    serializedReview.votes = await Promise.all(
      votes.map(async (vote) => {
        const serializedVote = await VoteSerializer.getSummary(vote);
        serializedReview.totalScore += vote.score;
        return serializedVote
      })
    );
    return serializedReview;
  }
}

export default ReviewSerializer;
