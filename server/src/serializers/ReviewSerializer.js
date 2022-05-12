class ReviewSerializer {
  static async getSummary(review) {
    const allowedAttributes = ["id", "title", "rating", "content", "userId"];
    const serializedReview = {};
    for (const attribute of allowedAttributes) {
      serializedReview[attribute] = review[attribute];
    }
    serializedReview.user = await review.$relatedQuery("user").email;
    return serializedReview;
  }
}

export default ReviewSerializer;
