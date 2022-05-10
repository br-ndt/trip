import express from "express";
import { Keyword } from "../../../models/index.js";
import { Attraction } from "../../../models/index.js";

const searchRouter = new express.Router();

searchRouter.get("/:query", async (req, res) => {
  const { query } = req.params;
  try {
    const attraction = await Attraction.query().findOne({ name: query });
    if (!attraction) {
      const keyword = await Keyword.query().findOne({ name: query });
      if (!keyword) {
        return res.status(404).json({ message: "nothing found" });
      }
      const foundAttractions = await keyword.$relatedQuery("attractions");
      if (!foundAttractions) {
        res.status(404).json({ message: "nothing found" });
      } else {
        res.status(200).json({ attractions: foundAttractions });
      }
    } else {
      res.status(200).json({ attraction })
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default searchRouter;
