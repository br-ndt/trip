class AttractionSerializer {
  static async getSummary(attraction) {
    const allowedAttributes = ["id", "name", "description"];
    let serializedAttraction = {};
    for(const attribute of allowedAttributes) {
      serializedAttraction[attribute] = attraction[attribute];
    }
    return serializedAttraction;
  }
}

export default AttractionSerializer;