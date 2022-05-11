class VoteSerializer {
  static async getSummary(vote) {
    const allowedAttributes = ["userId", "reviewId", "score"]
    const serializedVote = {}
    for (const attribute of allowedAttributes) {
      serializedVote[attribute] = vote[attribute]
    }
    return serializedVote
  }
}

export default VoteSerializer