/* eslint-disable no-console */
import { connection } from "../boot.js"
import LocationSeeder from "./seeders/LocationSeeder.js";
import AttractionSeeder from "./seeders/AttractionSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding locations...");
    await LocationSeeder.seed();

    // include individual seed commands here
    console.log("seeding attractions...");
    await AttractionSeeder.seed();

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder