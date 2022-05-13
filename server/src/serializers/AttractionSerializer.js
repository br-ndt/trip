import ReviewSerializer from "./ReviewSerializer.js";
import LocationSerializer from "./LocationSerializer.js";

class AttractionSerializer {
  static async getSummary(attraction) {
    const allowedAttributes = ["id", "name", "description", "image"];
    let serializedAttraction = {};
    for (const attribute of allowedAttributes) {
      serializedAttraction[attribute] = attraction[attribute];
    }
    return serializedAttraction;
  }
  static async getDetails(attraction) {
    const allowedAttributes = ["name", "description", "reviews", "image"];
    let serializedAttraction = {};
    for (const attribute of allowedAttributes) {
      serializedAttraction[attribute] = attraction[attribute];
    }
    const location = await attraction.$relatedQuery("location");
    serializedAttraction.location = await LocationSerializer.getSummary(location);
    const reviews = await attraction.$relatedQuery("reviews");
    serializedAttraction.reviews = await Promise.all(
      reviews.map(async (review) => await ReviewSerializer.getSummary(review))
    );
    return serializedAttraction;
  }
}

export default AttractionSerializer;
