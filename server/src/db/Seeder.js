/* eslint-disable no-console */
import { connection } from "../boot.js";
import AttractionSeeder from "./seeders/AttractionSeeder.js";
import ReviewSeeder from "./seeders/ReviewSeeder.js";
import UserSeeder from "./seeders/UserSeeder.js";

class Seeder {
  static async seed() {
    console.log("seeding attractions...");
    await AttractionSeeder.seed();
    console.log("seeding users...");
    await UserSeeder.seed();
    console.log("seeding reviews...");
    await ReviewSeeder.seed();

    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
