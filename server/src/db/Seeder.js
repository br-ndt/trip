/* eslint-disable no-console */
import { connection } from "../boot.js"
import LocationSeeder from "./seeders/LocationSeeder.js";
import AttractionSeeder from "./seeders/AttractionSeeder.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    console.log("seeding locations...");
    await LocationSeeder.seed();

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
    console.log("seeding users...");
    await UserSeeder.seed();
    console.log("seeding reviews...");
    await ReviewSeeder.seed();
    console.log("Done!");
    await connection.destroy();
  }
}

export default Seeder;
