import { Attraction } from "../../models/index.js";

class AttractionSeeder {
  static async seed() {
    const attractionsData = [
      {
        name: "Baha'i Gardens",
        description: "A very beautiful garden by the ocean.",
      },
      {
        name: "Jean's House",
        description: "Home to million dollar app ideas and the world's greatest Overwatch player.",
      },
      {
        name: "Launch Academy",
        description: "An intensive coding bootcamp!",
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
