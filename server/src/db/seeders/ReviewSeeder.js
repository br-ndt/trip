import { Review } from "../../models/index.js";

class ReviewSeeder {
  static async seed() {
    const reviewsData = [
      {
        title: "Loved the gardens",
        content: "The gardens by the ocean were great - will go back again",
        rating: 5,
        attractionId: 1,
        userId: 1,
      },
      {
        title: "Did not enjoy",
        content: "I thought the gardens were very ugly and I won't be returning",
        rating: 1,
        attractionId: 2,
        userId: 2,
      },
    ];
    for (const singleReviewData of reviewsData) {
      const currentReview = await Review.query().findOne(singleReviewData);
      if (!currentReview) {
        await Review.query().insert(singleReviewData);
      }
    }
  }
}

export default ReviewSeeder;
