import { Attraction } from "../../models/index.js";

class AttractionSeeder {
  static async seed() {
    const attractionsData = [
      {
        name: "Baháʼí Gardens",
        description: "The Baháʼí Terraces, or the Hanging Gardens of Haifa, are garden terraces on Mount Carmel in Haifa, and one of the most popular tourist destinations in Israel. Completed in 2001, there are 19 terraces and more than 1,500 steps ascending the mountain.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Baha%27i+Gardens.png",
        locationId: 1
      },
      {
        name: "Downtown Crossing",
        description: "Primarily a pedestrian shopping zone, Downtown Crossing lies at the intersection of Washington, Winter and Summer streets. Its historic buildings now house a mix of department stores, fashion and discount chains, souvenir shops and other specialty retailers.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Downtown+Crossing.png",
        locationId: 2
      },
      {
        name: "Launch Academy",
        description: "Launch Academy is a full-time, 18-week program with a part-time, 8-week online phase and then a full-time, 10-week course in Boston, Massachusetts. After this immersive learning experience, aspiring software developers will be transformed into contributing members of the development community.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/LaunchAcademy.png",
        locationId: 2
      },
      {
        name: "Times Square",
        description: "Times Square is a major commercial intersection, tourist destination, entertainment center, and neighborhood in Midtown Manhattan, New York City. It is formed by the junction of Broadway, Seventh Avenue and 42nd Street.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/TimesSquare.png",
        locationId: 3
      },
      {
        name: "Central Park",
        description: "Central Park is an urban park in New York City, between the Upper West and Upper East Sides of Manhattan. It is the fifth largest park in the city, covering 843 acres.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/CentralPark.png",
        locationId: 3
      },
      {
        name: "Eiffel Tower",
        description: "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/EiffelTower.png",
        locationId: 4
      },
      {
        name: "Catacombs",
        description: "A veritable labyrinth in the heart of underground Paris, the Catacombs were installed in the tunnels of former quarries.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/catacombs.png",
        locationId: 4
      },
      {
        name: "Medina",
        description: "The city history is seen in the brightly painted medina (old town) with its blue-white facades, the narrow streets of the Bab Souk district and the interior gardens of the Kasbah and its ramparts and towers, while the city is surrounded by diversified landscapes including mountains, forests and beaches.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Medina.png",
        locationId: 5
      },
      {
        name: "Talassemtane National Park",
        description: "Created in 2004, the park covers an area of about 60,000 ha (150,000 acres). The park extends over the eastern part of the limestone ridge of the central-western Rif, with cliffs and gorges making accessibility very limited.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Talassemtane+National+Park.png",
        locationId: 5
      },
      {
        name: "Tulum",
        description: "Tulum is the site of a pre-Columbian Mayan walled city which served as a major port for Coba, in the Mexican state of Quintana Roo. The ruins are situated on 39-foot-tall cliffs along the east coast of the Yucatán Peninsula on the Caribbean Sea.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Tulum.png",
        locationId: 6
      },
      {
        name: "Isla Blanca",
        description: "Sitting just 20km north of the city is a sublime, pencil thin, virtually untouched peninsula--a hidden corner of Cancún.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Isla+Blanca.png",
        locationId: 6
      },
      {
        name: "Georgia Aquarium",
        description: "One of the world's largest aquarium, it houses more than 100,000 aquatic creatures, including the largest sharks in the ocean: whale sharks.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/GeorgiaAquarium.png",
        locationId: 7
      },
      {
        name: "Atlanta Botanical Garden",
        description: "Two of its major specialties are the Rose Garden and its hydrangeas, each of which comprise the largest such collections in the southeast.",
        image: "https://trip-production.s3.amazonaws.com/tripImages/AtLantaBotanicalGarden.png",
        locationId: 7
      },
      {
        name: "Cinque Terre Trail",
        description: "Also known as the Blue trail, this 11 km hiking path connects Riomaggiore to Monterosso al Mare. Some portions of the trail are easy to walk, while others climb cliffs and hillsides along the coast.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/CinqueTerreTrail.png",
        locationId: 8
      },
      {
        name: "Grand Canyon National Park",
        description: "Home to much of the immense Grand Canyon, the world's largest canyon, with its layered bands of red rock revealing millions of years of geological history.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/GrandCanyonNationalPark.png",
        locationId: 9
      },
      {
        name: "Petrified Forest National Park",
        description: "The Petrified Forest is known for its fossils, especially fallen trees that lived in the Late Triassic Epoch, about 225 million years ago.",
        image:"https://trip-production.s3.amazonaws.com/tripImages/Petrified+Forest+National+Park.png",
        locationId: 9
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
