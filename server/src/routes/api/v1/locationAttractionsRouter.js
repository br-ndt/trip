import express from "express";

import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import { Attraction } from "../../../models/index.js";
import uploadImage from "../../../services/uploadImage.js";

const locationAttractionsRouter = express.Router({ mergeParams: true });

locationAttractionsRouter.post("/", uploadImage.single("image"), async (req, res) => {
  const { name, description } = cleanUserInput(req.body);
  try {
    const newAttraction = await Attraction.query().insertAndFetch({
      name,
      description,
      image: req.file.location,
      locationId: req.params.id,
    });
    return res.status(201).json({ attraction: newAttraction });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default locationAttractionsRouter;
