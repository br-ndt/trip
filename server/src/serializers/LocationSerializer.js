class LocationSerializer {
  static async getSummary(location) {
    const allowedAttributes = ["id", "city", "province", "country"];
    let serializedLocation = {};
    for (const attribute of allowedAttributes) {
      serializedLocation[attribute] = location[attribute];
    }
    return serializedLocation;
  }

  static async getDetails(location) {
    const allowedAttributes = ["id", "city", "province", "country", "description"];
    let serializedLocation = {};
    for (const attribute of allowedAttributes) {
      serializedLocation[attribute] = location[attribute];
    }
    serializedLocation.attractions = await location.$relatedQuery("attractions");
    return serializedLocation;
  }
}

export default LocationSerializer;
