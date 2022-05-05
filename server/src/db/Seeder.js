/* eslint-disable no-console */
import { connection } from "../boot.js";
import AttractionSeeder from "./seeders/AttractionSeeder.js";
import ReviewSeeder from "./seeders/ReviewSeeder.js";
import KeywordSeeder from "./seeders/KeywordSeeder.js";
import SearchMatchSeeder from "./seeders/SearchMatchSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding attractions...");
    await AttractionSeeder.seed();
    console.log("seeding reviews...");
    await ReviewSeeder.seed();
    console.log("seeding Keywords...");
    await KeywordSeeder.seed();
    console.log('seeding SearchMatch...');
    await SearchMatchSeeder.seed()
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
