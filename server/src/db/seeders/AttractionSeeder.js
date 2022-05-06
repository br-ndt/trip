import { Attraction } from "../../models/index.js";

class AttractionSeeder {
  static async seed() {
    const attractionsData = [
      {
        name: "Baha'i Gardens",
        description: "A very beautiful garden by the ocean.",
        locationId: 1
      },
      {
        name: "Downtown Crossing",
        description: "Unique area.",
        locationId: 2
      },
      {
        name: "Launch Academy",
        description: "Coding boot camp",
        locationId: 2
      },
    ];
    for (const singleAttractionData of attractionsData) {
      const currentAttraction = await Attraction.query().findOne(singleAttractionData);
      if (!currentAttraction) {
        await Attraction.query().insert(singleAttractionData);
      }
    }
  }
}

export default AttractionSeeder;
