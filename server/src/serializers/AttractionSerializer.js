import ReviewSerializer from "./ReviewSerializer.js";
class AttractionSerializer {
  static async getSummary(attraction) {
    const allowedAttributes = ["id", "name", "description"];
    let serializedAttraction = {};
    for (const attribute of allowedAttributes) {
      serializedAttraction[attribute] = attraction[attribute];
    }
    return serializedAttraction;
  }
  static async getDetails(attraction) {
    const allowedAttributes = ["name", "description", "reviews"];
    let serializedAttraction = {};
    for (const attribute of allowedAttributes) {
      serializedAttraction[attribute] = attraction[attribute];
    }
    const reviews = await attraction.$relatedQuery("reviews");
    serializedAttraction.reviews = await Promise.all(
      reviews.map(async (review) => await ReviewSerializer.getSummary(review))
    );
    return serializedAttraction;
  }
}

export default AttractionSerializer;
