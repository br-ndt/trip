import express from "express";

import { Review } from "../../../models/index.js";

const attractionsReviewsRouter= new express.Router()

attractionsReviewsRouter.get("/", async (req, res) => {
    
    try {
        const reviews = await Review.query()
        return res.status(200).json({ reviews })
    } catch (error) {
        return res.status(500).json({ error })
    }
})

export default attractionsReviewsRouter