import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = ["/", "/locations", "/locations/:id", "/user-sessions/new", "/users/new", "/attractions", "/attractions/new", "/attractions/:id"];

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
