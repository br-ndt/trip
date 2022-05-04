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
        city: "Lynn",
        province: "Massachusetts",
        country: "USA",
        description: "Lynn is the 8th largest municipality in Massachusetts and the largest city in Essex County. Situated on the Atlantic Ocean, 3.7 miles (6.0 km) north of the Boston city line at Suffolk Downs, Lynn is part of Greater Boston's urban inner core. Settled by Europeans in 1629, Lynn is the 5th oldest colonial settlement in the Commonwealth. An early industrial center, Lynn was long colloquially referred to as the 'City of Sin', owing to its historical reputation for crime and vice."
      },
      {
        city: "Boston",
        province: "Massachusetts",
        country: "USA",
        description: "Boston, officially the City of Boston, is the capital and most populous city of the Commonwealth of Massachusetts in the United States and 24th-most populous city in the country. The city proper covers about 48.4 sq mi (125 km2) with a population of 675,647 in 2020, also making it the most populous city in New England. The city is the economic and cultural anchor of a substantially larger metropolitan area known as Greater Boston, a metropolitan statistical area (MSA) home to a census-estimated 4.8 million people in 2016 and ranking as the tenth-largest MSA in the country"
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