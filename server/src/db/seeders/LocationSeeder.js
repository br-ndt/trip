import { Location } from "../../models/index.js";

class LocationSeeder {
  static async seed() {
    const locationsData = [
      {
        city: "Haifa",
        province: "Haifa",
        country: "Israel",
        description: "Haifa is the third-largest city in Israel—after Jerusalem and Tel Aviv—with a population of 285,316 in 2019. The city of Haifa forms part of the Haifa metropolitan area, the third-most populous metropolitan area in Israel. It is home to the Baháʼí Faith's Baháʼí World Centre, and is a UNESCO World Heritage Site and a destination for Baháʼí pilgrimage."
      },
      {
        city: "Boston",
        province: "Massachusetts",
        country: "USA",
        description: "Boston, officially the City of Boston, is the capital and most populous city of the Commonwealth of Massachusetts in the United States and 24th-most populous city in the country. The city proper covers about 48.4 sq mi (125 km2) with a population of 675,647 in 2020, also making it the most populous city in New England. The city is the economic and cultural anchor of a substantially larger metropolitan area known as Greater Boston, a metropolitan statistical area (MSA) home to a census-estimated 4.8 million people in 2016 and ranking as the tenth-largest MSA in the country"
      },
      {
        city: "New York City",
        province: "New York",
        country: "USA",
        description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers."
      },
      {
        city: "Paris",
        province: "Île-de-France",
        country: "France",
        description: "Paris is the capital and most populous city of France. Since the 17th century, Paris has been one of the world's major centres of finance, diplomacy, commerce, fashion, gastronomy, science, and arts."
      },
      {
        city: "Chefchaouen",
        province: "Chefchaouen",
        country: "Morocco",
        description: "Chefchaouen is a city in the Rif Mountains known for the striking, blue-washed buildings of its town."
      },
      {
        city: "Cancún",
        province: "Yucatán",
        country: "Mexico",
        description: "Cancún is a city bordering the Caribbean Sea, known for its beaches, numerous resorts and nightlife. It is a popular destination for travelers."
      },
      {
        city: "Atlanta",
        province: "Georgia",
        country: "USA",
        description: "Atlanta is the capital and most populous city of the U.S. state of Georgia. The city played an important part in both the Civil War and the 1960s Civil Rights Movement."
      },
      {
        city: "Cinque Terre",
        province: "Liguria",
        country: "Italy",
        description: "Cinque Terre is a string of centuries-old seaside villages on the rugged Italian Riviera coastline."
      },
      {
        city: "Flagstaff",
        province: "Arizona",
        country: "USA",
        description: "Flagstaff lies near the southwestern edge of the Colorado Plateau and within the San Francisco volcanic field, along the western side of the largest contiguous ponderosa pine forest in the continental United States."
      },
    ];
    for (const singleLocationData of locationsData) {
      const currentLocation = await Location.query().findOne(singleLocationData);
      if (!currentLocation) {
        await Location.query().insert(singleLocationData);
      }
    }
  }
}

export default LocationSeeder;