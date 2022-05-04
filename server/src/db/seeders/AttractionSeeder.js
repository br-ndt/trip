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
        name: "Jean's House",
        description: "Home to million dollar apps and the world's greatest Overwatch player.",
        locationId: 2
      },
      {
        name: "Launch Academy",
        description: "Jean-Free Zone",
        locationId: 3
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
