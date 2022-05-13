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
        title: "Lots of restaurants",
        content: "Although you might run into some unique folks, the shopping and dining is pretty good",
        rating: 3,
        attractionId: 2,
        userId: 2,
      },
      {
        title: "Learned so much",
        content: "This was such a fun experience, I learned full-stack web development--and made friends!",
        rating: 5,
        attractionId: 3,
        userId: 2,
      },
      {
        title: "Way too busy",
        content: "Fun if you want to be bumped into 100 times in an hour",
        rating: 1,
        attractionId: 4,
        userId: 2,
      },
      {
        title: "About what you'd expect",
        content: "Tourists, street vendors, lots of selfies, and a big metal tower",
        rating: 3,
        attractionId: 5,
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
